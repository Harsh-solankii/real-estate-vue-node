const { where,Op } = require("sequelize");
const {
    Channels,
    User,
    messages,
    Sequelize,
  } = require("../models/index");


exports.getchannels = async(req,res) =>{

    let data;

    if(req.params.role == 'contractor'){
         data = await  Channels.findAll({
            attributes: ['id','user1','user2', [Sequelize.literal('(SELECT firstname FROM Users u WHERE Channels.user1 = u.id)'), 'name']],
            where: {
             user2: req.params.id
            },
            })
    }else{ 
        data = await  Channels.findAll({
            attributes: ['id','user1','user2', [Sequelize.literal('(SELECT firstname FROM Users u WHERE Channels.user2 = u.id)'), 'name']],
            where: {
             user1: req.params.id
            },
            })
    }

    res.json(data);
}  

exports.addmessages = async(req,res) =>{
  const msgdata = await messages.create({
    channelid:req.body.channel_id,
    message:req.body.msg
  })

  res.json(msgdata);
}

exports.getmessages = async(req,res) =>{
    const msgs_data = await messages.findAll({
        where:{
            channelid:req.params.id
        }
    })

    res.json(msgs_data);
}