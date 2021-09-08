const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};

module.exports.createNewUser = async (req, res, next) => {
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        });
    }catch (e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

module.exports.renderLogIn = (req, res) => {
    res.render('users/login');
};

module.exports.logInUser = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logOutUser = (req, res) => {
    req.logout();
    req.flash('success', 'You have been logged out');
    res.redirect('/campgrounds');
};