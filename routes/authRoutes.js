const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validations/authValidation');
const validateRequest = require('../middleware/validateRequest');

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

module.exports = router;
