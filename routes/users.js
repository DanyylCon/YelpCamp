const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.createNewUser));

router.route('/login')
    .get(users.renderLogIn)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.logInUser);

router.get('/logout', users.logOutUser);

module.exports = router;