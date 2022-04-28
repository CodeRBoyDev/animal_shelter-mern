const express = require('express');
const router = express.Router();

const {newDisease, getDisease, read, updateDisease, deleteDisease} = require('../controllers/diseaseController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/disease/new').post(isAuthenticatedUser('admin','employee'),newDisease);
router.route('/disease').get(isAuthenticatedUser('admin','employee'),getDisease);
router.get('/disease/:id', isAuthenticatedUser('admin','employee'),read);
router.route('/disease/:id').put(isAuthenticatedUser('admin','employee'),updateDisease).delete(isAuthenticatedUser('admin','employee'),deleteDisease);;




module.exports = router;