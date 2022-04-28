const express = require('express');
const router = express.Router();

const {newAnimal, getAnimal, getCreateAnimal, read,updateAnimal, deleteAnimal, createAnimalComment, createAdoptionRequest,AllAdoptionRequest,AcceptAdoptionRequest, cancelAdoptionRequest} = require('../controllers/animalController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/animal/new').post(isAuthenticatedUser('admin','employee'),newAnimal);
router.route('/animal').get(isAuthenticatedUser('admin','employee'),getAnimal);
router.route('/animal/create').get(isAuthenticatedUser('admin','employee'),getCreateAnimal);
router.route('/animal/comment/:id').put(isAuthenticatedUser('admin','employee','adopter'),createAnimalComment);
router.route('/animal/request/:id').put(isAuthenticatedUser('admin','employee','adopter'),createAdoptionRequest);
router.route('/animal/cancel/:id').put(isAuthenticatedUser('admin','employee','adopter'),cancelAdoptionRequest);
router.route('/animal/all/request').get(isAuthenticatedUser('admin','employee'),AllAdoptionRequest);
router.route('/animal/accept/request/:id').put(isAuthenticatedUser('admin','employee'),AcceptAdoptionRequest);
router.get('/animal/:id',isAuthenticatedUser('admin','employee'), read);
router.route('/animal/:id').put(isAuthenticatedUser('admin','employee'),updateAnimal)
router.route('/animal/:id').delete(isAuthenticatedUser('admin','employee'),deleteAnimal);;


module.exports = router;