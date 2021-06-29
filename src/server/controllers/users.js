const { ModuleFilenameHelpers } = require('webpack');
const User = require('../models/user'),
    catchAsync = require('../utils/catchAsync'),
    getManifest = require('../utils/getManifest');

module.exports.renderRegister = catchAsync(async (req, res) => {
    const manifest = await getManifest();
    res.render('users/register', {manifest})
});

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Account registered successfully!')
            res.redirect('/')
        })
    } catch(e) {
        req.flash('error', 'Something went wrong, check your inputs and try again.')
        console.log(e)
        res.redirect('register')
    }
}

module.exports.renderLogin = catchAsync(async (req, res) => {
    const manifest = await getManifest();
    res.render('users/login', {manifest});
});

module.exports.login = (req, res) => {
    req.flash('success', 'Logged in successfully')
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You have been successfully logged out.')
    res.redirect('/');
}

module.exports.renderChange = catchAsync( async (req,res) => {
    const manifest = await getManifest();
    res.render('users/changePassword', {user: req.user, manifest})
})

module.exports.updatePassword = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id)
        await currentUser.changePassword(req.body.oldPassword, req.body.newPassword)
        await currentUser.resetAttempts();
        await currentUser.save();
        req.flash('success', 'Password changed successfully!')
        res.redirect('/')
    }
    catch(e) {
        req.flash('error', 'Something went wrong, check your inputs and try again.')
        console.log(e)
        res.redirect('change-password')
    }
}