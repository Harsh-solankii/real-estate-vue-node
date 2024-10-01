const { Op, where } = require("sequelize");
const { User, user_session } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { raw } = require("body-parser");

exports.signup = async (req, res, next) => {
  const user = await User.create(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.json(user);
};

exports.logout = async (req, res) => {
  try {
    const result = await user_session.destroy({
      where: { cookie_token: req.cookies.token },
    });

    res.clearCookie('token').status(200).redirect("/");
  } catch (error) {
    console.log(error);
  }
}

exports.logoutfromotherdevice = async(req,res) => {
  const result_of = await user_session.findAndCountAll({where:{userId:req.user.id},raw:true});
  let io = req.app.get('socketio');
  result_of.rows.forEach(element => {
    io.emit(`log-out-${element.cookie_token}`); 
  });

  const result = await user_session.destroy({where:{
    userId:req.user.id,
    cookie_token:{
      [Op.ne]:req.cookies.token
    }
  }})

  res.json("done");
}

exports.logoutfromalldevices = async (req, res) => {

  const result_of = await user_session.findAndCountAll({where:{userId:req.user.id},raw:true});
  let io = req.app.get('socketio');
  result_of.rows.forEach(element => {
    io.emit(`log-out-${element.cookie_token}`); 
  });

  const result = await user_session.destroy({ where: { userId: req.user.id } });

  res.clearCookie("token").status(200).redirect('/');
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.json ({
      message: "The email is not yet registered",
      statusCode: 400,
    });
    return; 
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  

  if (!passwordMatch) {
    res.json ({ message: "The password or email is invalid", statusCode: 400 });
    return;
  }

  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: '12h',
  });

  const sessiondetails = await user_session.create({
    userId: user.id,
    cookie_token: token
  })

  // res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });
  
  res.json({sessiondetails,...user.dataValues});
   
};
