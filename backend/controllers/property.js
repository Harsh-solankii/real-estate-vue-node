const { Op, where } = require("sequelize");
const {
  User,
  property,
  prop_job_table,
  job_tasks_table,
  pow_task_images,
  estimates,
  proofwork_images,
  comments,
  Channels,
  Sequelize,
} = require("../models/index");
const { raw } = require("mysql");

const stripe = require("stripe")(
  "sk_test_51PcomURo9DirKrSxU4tTzZT7RqQl60ZYUYcjOjaydylZ9pwbpBY2pIkufKAA11DriPaMsk9hE9Vh3hDDjpWpDvOL00ioyDC9tI"
);

exports.checkoutsession = async (req, res) => {
  const { amount } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "amount",
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/error",
  });
  res.json({ id: session.id });
};

exports.addproperty = async (req, res) => {
  const property_data = await property.create(req.body);

  res.json(property_data);
};

exports.addjob = async (req, res) => {
  const job_data = await prop_job_table.create({
    ...req.body,
    userid: req.params.id,
  });

  res.json(job_data);
};

exports.addtask = async (req, res) => {
  let body = req.body;

  let files = req.files;

  let taskid = [];
  let task_data = [];

  for (let i = 0; i < body.task_title.length; i++) {
    task_data[i] = await job_tasks_table.create({
      jobid: body.job_id,
      task_title: body.task_title[i],
      task_desc: body.task_desc[i],
    });
    taskid.push(task_data[i].dataValues.id);
  }

  taskid.forEach(async (e, index) => {
    await pow_task_images.create({
      taskid: e,
      images: files.upload[index].filename,
    });
  });

  await prop_job_table.update(
    {
      job_status: "submitted",
    },
    {
      where: {
        id: body.job_id,
      },
    }
  );

  res.json(task_data);
};

exports.getprops = async (req, res) => {
  const prop_data = await property.findAll({
    where: {
      userid: req.params.id,
    },
    raw: true,
  });

  let prop_data_2 = await property.findAll({
    include: [
      {
        model: prop_job_table,
        required: false,
        attributes: [],
      },
    ],
    where: {
      "$prop_job_table.prop_id$": null,
      userid: req.params.id,
    },
    raw: true,
  });

  res.json(prop_data_2);
};

exports.getjobs = async (req, res) => {
  const submited_jobs = await prop_job_table.findAll({
    where: {
      job_status: {
        [Op.like]: "submitted",
      },
      userid: req.params.id,
    },
  });

  const remaining_jobs = await prop_job_table.findAll({
    where: {
      job_status: null,
      userid: req.params.id,
    },
  });

  res.json({ remaining_jobs, submited_jobs });
};

exports.showestimatejobs = async (req, res) => {
  const show_estimate_jobs = await prop_job_table.findAll({
    include: [
      {
        model: estimates,
        required: false,
      },
    ],
    where: {
      "$estimate.user_id$": req.params.id,
    },
    raw: true,
  });

  res.json(show_estimate_jobs);
};

exports.accepted_jobs = async (req, res) => {
  const accepted_jobs = await prop_job_table.findAll({
    where: {
      job_status: "in progress",
      userid: req.params.id,
    },
  });

  res.json(accepted_jobs);
};

exports.receivepow = async (req, res) => {
  let getdata;
  let multipledata;
  let finaldata;
  
  //for user
  if (req.params.id == 0) {
    getdata = await proofwork_images.findAll({
      where: {
        user_id: req.params.id2,
      },
      include:[
        {
          model: prop_job_table,
        },
      ],
      raw: true,
    });


    multipledata = getdata.reduce((accumulator, item) => {
      accumulator[item.jobid] ??= {
        id: item.id,
        jobid: item.jobid,
        job_name: item['prop_job_table.job_name'],
        job_desc: item['prop_job_table.job_desc'],
        con_id: item['prop_job_table.con_id'],
        comment_con:'',
        image: [],
      };
      accumulator[item.jobid].image.push(item.image);
      return accumulator;
    }, {});

    finaldata = await comments.findAll({
      where: {
          userid: req.params.id2,
          comment_user:null
      },
      raw: true,
    });

  finaldata.forEach((e) => {
    if (multipledata[e.jobid]) {
      multipledata[e.jobid].comment_con = e.comment_con;
    }
  });

  } else { // for contractor
    getdata = await proofwork_images.findAll({
      where: {
        con_id: req.params.id2,
      },
      include:[
        {
          model: prop_job_table,
        },
      ],
      raw: true,
    });
    
    multipledata = getdata.reduce((accumulator, item) => {
      accumulator[item.jobid] ??= {
        id: item.id,
        jobid: item.jobid,
        job_name: item['prop_job_table.job_name'],
        job_desc: item['prop_job_table.job_desc'],
        user_id: item['prop_job_table.userid'],
        comment_user:'',
        image: [],
      };
      accumulator[item.jobid].image.push(item.image);
      return accumulator;
    }, {});
    
    finaldata = await comments.findAll({
      where: {
          con_id: req.params.id2,
          comment_con:null
      },
      raw: true,
    });
    
    finaldata.forEach((e) => {
        if (multipledata[e.jobid]) {
            multipledata[e.jobid].comment_user = e.comment_user;
          }
    });
  }

  res.json(multipledata);
};

exports.verify_jobs = async(req,res) =>{
  const data = await prop_job_table.findAll({
    where:{
      job_status:'verify',
      userid:req.params.id
    }
  })

  res.json(data);
}

exports.complete_job = async(req,res) =>{
  const data = await prop_job_table.update({
    job_status:'completed'
  },
    {
    where:{
    id:req.params.id
    }
  })
  res.json(data);
}