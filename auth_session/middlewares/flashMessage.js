function flashMessage(req, res, next){
    if (req.session) {
        res.locals.flash = req.session.flash;
        delete req.session.flash;
    } else {
        res.session.flash = null;
    }
    next();
}

module.exports = flashMessage;