const express = require('express');
const router = express.Router();

const {getRescuedChart} = require('../controllers/dashboardController');


router.route('/dashboard/rescued').post(getRescuedChart);

module.exports = router;