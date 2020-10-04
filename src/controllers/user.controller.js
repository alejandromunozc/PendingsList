const userModel = require('../lib/models/user');
const passport = require('passport');

const userController = {};

userController.renderSignUp = (req, res) => {
    res.render('users/signup');
}

userController.signUp = async(req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'Passwords not match' });
    }
    if (password.length < 5) {
        errors.push({ text: 'Password must have 5 characters or more' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email });
    } else {
        const emailUser = await userModel.findOne({ email: email });
        if (emailUser) {
            req.flash('msg_error', 'The email already exists.');
            res.redirect('/user/register');
        } else {
            const newUser = new userModel({ name, email, password });
            newUser.password = await newUser.encryptPass(password);
            await newUser.save();
            req.flash('msg_success', 'Successful registration!');
            res.redirect('/task');
        }
    }
}

userController.renderLogin = (req, res) => {
    res.render('users/login');
}

userController.login = passport.authenticate('local', {
    failureRedirect: '/user/login',
    successRedirect: '/task',
    failureFlash: true
});

userController.logout = (req, res) => {
    req.logout();
    res.redirect('/user/login');
}

module.exports = userController;