const express = require('express');
const router = express.Router();

const {getInjury, newInjury, read, updateInjury, deleteInjury} = require('../controllers/injuryController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/injury/new').post(isAuthenticatedUser('admin','employee'),newInjury);
router.route('/injury').get(isAuthenticatedUser('admin','employee'),getInjury);
router.get('/injury/:id',isAuthenticatedUser('admin','employee'), read);
router.route('/injury/:id').put(isAuthenticatedUser('admin','employee'),updateInjury).delete(isAuthenticatedUser('admin','employee'),deleteInjury);


module.exports = router;