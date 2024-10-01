const jwt = require("jsonwebtoken");
const { user_session } = require("../models/index");
const { where } = require("sequelize");

exports.guest = async (req, res, next) => {
    try {
        if (req.cookies.token) {
            try {
                let decoded = jwt.verify(req.cookies.token, process.env.SECRET);
                let result = await user_session.findAndCountAll({
                    where: { userId: decoded.id, cookie_token: req.cookies.token },
                    raw: true
                });
                if (result.count && result.rows[0].cookie_token == req.cookies.token) {
                    next();
                } else {
                    res.clearCookie('token').redirect('/');
                }
            } catch (err) {
                next();
            }
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log("middleware guest: " + error);
    }
};


