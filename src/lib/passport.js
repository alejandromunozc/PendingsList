const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('./models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {
    const user = await userModel.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'User or password error' });
    } else {
        const match = await user.matchPass(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'User or password error' });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
        done(err, user);
    }).lean();
});