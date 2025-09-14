const router = require("express").Router();
const authController = require("../controllers/authC");

router.get('/', (req, res) => {
    if(!req.session.isAuthenticated) res.redirect('/login');
})

router.route('/login')
    .get(authController.renderLoginForm)
    .post(authController.login);

router.route('/register')
    .get(authController.renderRegisterForm)
    .post(authController.checkUser, authController.register);

router.route('/logout').post(authController.logout);


module.exports = router;