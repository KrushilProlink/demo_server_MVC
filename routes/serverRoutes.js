const express = require('express');
const route = express.Router();
const authRoutes = require("./authRoutes");
const employeeRoutes = require("./employeeRoutes");

route.use('/auth', authRoutes);
route.use('/employee', employeeRoutes);

module.exports = route;


