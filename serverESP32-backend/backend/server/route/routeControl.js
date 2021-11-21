const express = require('express');
const router = express.Router();
const deviceService = require('../service/deviceService');

router.get('/api/device-history', async function(req, res, next) {
  try {
    const devices = await deviceService.getDevices();
    res.json(devices);
  } catch (e) {
    next(e);
  }
});

router.post('/api/device-history', async function (req, res, next) {
	const device = req.body;
  try {
    const newDevice = await deviceService.saveDevice(device);
	  res.status(201).json(newDevice);  
  } catch (e) {
    next(e);
  }
});

module.exports = router;