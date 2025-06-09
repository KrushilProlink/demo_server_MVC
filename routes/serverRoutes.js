const express = require('express');
const route = express.Router();
const verifyAuthToken = require('../middleware/auth')
const authRoutes = require("./authRoutes");
const employeeRoutes = require("./employeeRoutes");

route.use('/auth', authRoutes);
route.use('/employee', verifyAuthToken, employeeRoutes);

module.exports = route;


