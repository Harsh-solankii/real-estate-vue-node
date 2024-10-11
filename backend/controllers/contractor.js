const {
    User,
    property,
    prop_job_table,
    job_tasks_table,
    pow_task_images,
    estimates,
    proofwork_images,
    Channels,
    comments,
    Sequelize,
  } = require("../models/index");
  const { Op, where } = require("sequelize");
exports.accepted_con_jobs = async (req, res) => {
    const accepted_jobs = await prop_job_table.findAll({
      where: {
        job_status: "in progress",
        con_id: req.params.id,
      },
    });
  
    res.json(accepted_jobs);
  };
  
  exports.getsubmittedjobs = async (req, res) => {
    const submited_jobs = await prop_job_table.findAll({
      include: [
        {
          model: estimates,
          required: false,
          attributes: [],
        },
      ],
      where: {
        [Op.or]:{
        "$estimate.jobid$": null,
        '$estimate.con_id$':{
        [Op.ne]:Number(req.params.id)
        },
      },
        job_status: "submitted",
      },
      raw: true,
    });
  
    res.json(submited_jobs);
  };
  
  exports.showtaskforthejob = async (req, res) => {
    const job_data = await prop_job_table.findAll({
      where: {
        id: req.params.id,
      },
    });
  
    const task_data = await job_tasks_table.findAll({
      where: {
        jobid: req.params.id,
      },
    });
  
    res.json({ job_data, task_data });
  };
  
  exports.addestimate = async (req, res) => {
    let body = req.body;
  
    const add_estimate = await estimates.create({
      jobid: body.jobid,
      estimates: body.estimate,
      con_id: body.conid,
      user_id: body.userid,
    });
  
    const count_channels = await Channels.findAndCountAll({
      where:{
        user1:body.userid,
        user2:body.conid
      },
      raw:true
    })
  
    console.log(count_channels.rows.jobid);
  
    if(count_channels.count == 0){
      const channel_create = await Channels.create({
        user1:body.userid,
        user2:body.conid,
        jobid:body.jobid
      })
    }else if(count_channels.rows.jobid != body.jobid){
      await Channels.update({
        jobid:body.jobid
      },{
         where:{
          user1:body.userid,
          user2:body.conid
         }
      })
    }
  
    res.json("done");
  };
  
  exports.showproposaljobs = async (req, res) => {
    const proposal_jobs = await prop_job_table.findAll({
      include: [
        {
          model: estimates,
          required: false,
        },
      ],
      where: {
        "$estimate.con_id$": req.params.id,
      },
      raw: true,
    });
  
    res.json(proposal_jobs);
  };
  
  exports.acceptreject_job = async (req, res) => {
    if (req.params.flag == 0) {
      await estimates.destroy({
        where: {
          id: req.params.id,
        },
      });
    } else {
      await estimates.destroy({
        where: {
          jobid: req.params.flag,
        },
      });
  
      const estimate_data = await estimates.findAll({
        where: {
          id: req.params.id,
          deletedAt: {
            [Op.ne]: null,
          },
        },
        raw: true,
        paranoid: false,
      });
  
  
      await prop_job_table.update(
        {
          job_estimate: estimate_data[0].estimates,
          job_status: "in progress",
          con_id: estimate_data[0].con_id,
        },
        {
          where: {
            id: req.params.flag,
          },
        }
      );
    }
    res.json("done");
  };
  
  exports.receive_update = async(req,res) =>{
    const update_data = await prop_job_table.findAll({
      where:{
         con_id:req.params.id,
         job_status:'in progress'  
      }
    })
    res.json(update_data);
  }
  
  exports.sendpow = async (req, res) => {
    // for user
    if(req.body.role_id == 0){
      if(req.files.length !== undefined){
        let files = req.files;
    
      files.powimages.forEach(async (element) => {
        await proofwork_images.create({
          jobid: req.params.jobid,
          con_id: req.body.con_id,
          user_id: req.body.userid,
          image: element.filename,
        });
      });
      }

      await comments.create({
        comment_con:req.body.pow_desc,
        jobid:req.params.jobid,
        userid:req.body.userid,
        con_id:req.body.con_id
      })
      
    } else if(req.body.role_id == 1) {
      
      // for contractor
      if(req.files.length !== undefined){
        let files = req.files;
    
      files.powimages.forEach(async (element) => {
        await proofwork_images.create({
          jobid: req.params.jobid,
          con_id: req.body.con_id,
          user_id: req.body.userid,
          image: element.filename,
        });
      });
      }

      await comments.create({
        comment_con:req.body.pow_desc,
        jobid:req.params.jobid,
        userid:req.body.userid,
        con_id:req.body.con_id
      })
      
      if(req.body.job_status == 'true'){
        await prop_job_table.update({
          job_status:'verify'
        },{
          where:{
            id:req.params.jobid
          }
        })
      }
    }
    res.json('done');
  };
  