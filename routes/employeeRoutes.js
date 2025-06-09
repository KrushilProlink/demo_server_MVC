const express = require('express');
const router = express.Router();
const { getAll, addOne, getOne, editOne, deleteData } = require('../controllers/employeeController');
const  empoyessSchema  = require('../validations/employeeValidation');
const validateRequest = require('../middleware/validateRequest');
const verifyAuthToken = require('../middleware/auth')

router.post('/', getAll);
router.post('/addEmployee',verifyAuthToken, validateRequest(empoyessSchema), addOne);
router.get('/getEmployee/:id',verifyAuthToken, getOne);
router.put('/editEmployee/:id',verifyAuthToken, validateRequest(empoyessSchema), editOne);
router.delete('/deleteEmployee/:id',verifyAuthToken, deleteData);

module.exports = router;
