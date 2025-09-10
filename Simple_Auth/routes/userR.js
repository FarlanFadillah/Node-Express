const router = require('express').Router();
const authC = require('../controllers/AuthC')

router.post('/register', authC.registerUser);
router.get('/', authC.getAllUser);
router.post('/login', authC.login);


module.exports = router;