const deviceData = require('../data/devicesData');

exports.getDevices = function () {
  return deviceData.getDevices();
};

exports.saveDevice = async function (device) {
  const existingDevice = await deviceData.getDeviceByName(device.name);
  if (existingDevice) throw new Error('O aparelho já existe');
  return deviceData.saveDevice(device);
};

exports.deleteDevice = function (id) {
  return deviceData.deleteDevice(id);
};