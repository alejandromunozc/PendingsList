const { Router } = require('express');
const router = Router();
const {
    renderSignUp,
    signUp,
    renderLogin,
    login,
    logout
} = require('../controllers/user.controller');

router.get('/user/register', renderSignUp);

router.post('/user/register', signUp);

router.get('/user/login', renderLogin);

router.post('/user/login', login);

router.get('/user/logout', logout);


module.exports = router;