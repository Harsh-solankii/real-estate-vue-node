var JwtStrategy = require("passport-jwt").Strategy;
ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const protect = (passport) => {
  var opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  opts.secretOrKey = process.env.SECRET;

  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      return done(null, jwt_payload);
    })
  );
};

module.exports = protect;
