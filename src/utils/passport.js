const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const { User } = require('../database/models');

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.USER_JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (user, done) => {
            try {
                console.log(user.email);
                return done(null, user);
            } catch (error) {
                done({
                    status: false,
                    code: 401,
                    message: "Access denied.",
                    error: {}
                });
            }
        }
    )
);

module.exports = passport;