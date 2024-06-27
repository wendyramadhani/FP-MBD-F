const express = require('express');
const router = express.Router();
const pembayaranController = require('../controllers/pembayaranController');

router.get('/', pembayaranController.getAllPembayaran);
router.get('/:id_pembayaran', pembayaranController.getPembayranById);
router.post('/', pembayaranController.addPembayaran);
router.put('/:id_pembayaran', pembayaranController.updatePembayaran);

module.exports = router;