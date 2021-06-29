const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    catchAsync = require('../utils/catchAsync'),
    users = require('../controllers/users'),
    {validateUser} = require('../utils/validateUser');

router.route('/register')
    .get(users.renderRegister)
    .post(validateUser, catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)

router.route('/change-password')
    .get(users.renderChange)
    .post(catchAsync(users.updatePassword))

router.get('/logout', users.logout)

module.exports = router;