const express = require('express');
const router = express.Router();

const {newUSer, getUser, deleteUser, read, updateEmployee, adopterUser, updateAdopter,updateAdopterStatus, getADopter, loginUser, logout} = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/user/new').post(isAuthenticatedUser('admin'),newUSer);
router.route('/user/newadopter').post(adopterUser);
router.route('/user').get(isAuthenticatedUser('admin'),getUser); 
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/useradopter').get(isAuthenticatedUser('admin','employee'),getADopter);
router.get('/user/:id',isAuthenticatedUser('admin','employee','adopter'), read); 
router.route('/user/adopter/:id').put(isAuthenticatedUser('admin','employee','adopter'),updateAdopter)
router.route('/user/status/:id').put(isAuthenticatedUser('admin','employee'),updateAdopterStatus)
router.route('/user/:id').put(isAuthenticatedUser('admin'),updateEmployee).delete(isAuthenticatedUser('admin'),deleteUser);

module.exports = router;