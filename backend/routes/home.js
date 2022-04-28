const express = require('express');
const router = express.Router();

const {gethomeAnimal, getAnimalComment} = require('../controllers/homeController');


router.route('/home/animal').get(gethomeAnimal);
router.route('/home/animal/comment/:id').get(getAnimalComment);

module.exports = router;