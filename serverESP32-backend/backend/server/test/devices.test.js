const crypto = require('crypto');
const axios = require('axios');
const deviceServices = require('../service/deviceService');

const generate = function () {
  return crypto.randomBytes(10).toString('hex');
};

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

test('Should get devices', async function () {
  const post1 = await deviceServices.saveDevice({ name: generate(), status: 1 });
  const post2 = await deviceServices.saveDevice({ name: generate(), status: 1 });
  const post3 = await deviceServices.saveDevice({ name: generate(), status: 1 });
  const response = await request('http://localhost:3000/api/device-history', 'get');
  expect(response.status).toBe(200);
  const devices = response.data;
  expect(devices).toHaveLength(3);
  // await deviceServices.deleteDevice(post1.id);
  // await deviceServices.deleteDevice(post2.id);
  // await deviceServices.deleteDevice(post3.id);
});

test('Should save device', async function () {
  const data = { name: generate(), status: 1 };

  const response = await request(
    'http://localhost:3000/api/device-history',
    'post',
    data
  );
  expect(response.status).toBe(201);
  const device = response.data;
  expect(device.name).toBe(data.name);
  await deviceServices.deleteDevice(device.id);
});


test('Should not save device', async function () {
  const data = { name: generate(), status: 1 };

  const response1 = await request(
    'http://localhost:3000/api/device-history',
    'post',
    data
  );
  const response2 = await request(
    'http://localhost:3000/api/device-history',
    'post',
    data
  );
  expect(response2.status).toBe(409);
  const device = response1.data;
  expect(device.name).toBe(data.name);
  await deviceServices.deleteDevice(device.id);
});
