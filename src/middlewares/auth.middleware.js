const { ExtractJwt, Strategy } = require("passport-jwt");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

const {
  findUserById,
  updateUser,
  deleteUser,
} = require("../users/users.controllers");

const passportConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(passportConfig, (tokenDecoded, done) => {
    findUserById(tokenDecoded.id)
      .then((data) => {
        if (data) {
          done(null, tokenDecoded);
        } else {
          done(null, false, { message: 'Token Incorrect' });
        }
      })
      .catch((error) => {
        done(error, false);
      });
  })
);

module.exports = passport.authenticate("jwt", { session: false });
