module.exports.inLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl
        return res.redirect('/login');
    }
    next();
}

module.exports.saveRedirecturl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
        delete req.session.redirectUrl; // optional but good practice
    }
    next();
}