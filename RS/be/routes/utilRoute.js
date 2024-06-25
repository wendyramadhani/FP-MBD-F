const express = require('express');
const router = express.Router();
const utilController = require('../controllers/utilController');

router.post('/check_id', utilController.checkId);

module.exports = router;