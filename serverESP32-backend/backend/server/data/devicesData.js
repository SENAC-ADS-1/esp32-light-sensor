const database = require('../infra/database');

exports.getDevices = function () {
  return database.query('select * from device_control');
}

exports.getDeviceById = function (id) {
  return database.oneOrNone('select * from device_control where id = $1', [id])
}

exports.saveDevice = function (device) {
	return database.one('insert into device_control (name, status) values ($1, $2) returning *', [device.name, device.status]);
};

exports.deleteDevice = function (id) {
	return database.none('delete from device_control where id = $1', [id]);
};