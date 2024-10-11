const { where,Op } = require("sequelize");
const {
    Channels,
    comments,
    User,
    messages,
    Sequelize,
  } = require("../models/index")



  exports.addcomment = async(req,res) => {
    let body = req.body
    if(body.comment_user){
        await comments.create({
            userid:body.userid,
            con_id:body.con_id,
            comment_user:body.comment_user
        })
    }else{
        await comments.create({
            userid:body.userid,
            con_id:body.con_id,
            comment_con:body.comment_con
        })
    }

    res.json('updated');
  }
