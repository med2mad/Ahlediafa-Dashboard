const router = require('express').Router();
const { signupValidation, updatePasswordValidation, updateUserValidation } = require('../1 - configurations/validations');

//controller functions
const {profile, login, signup, update, updatePassword} = require('../3 - controllers/user');

//get one user
router.post('/profile', profile);

//login
router.post('/login', login);
//insert new
router.post('/signup', signupValidation(), signup);

//update
router.put('/', updateUserValidation(), update);
router.put('/password', updatePasswordValidation(), updatePassword);

module.exports = router;