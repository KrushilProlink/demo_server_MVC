const express = require('express');
const router = express.Router();
const { getAll, addOne, getOne, editOne, deleteData } = require('../controllers/employeeController');
const empoyessSchema = require('../validations/employeeValidation');
const validateRequest = require('../middleware/validateRequest');

router.post('/', getAll);
router.post('/addEmployee', validateRequest(empoyessSchema), addOne);
router.get('/getEmployee/:id', getOne);
router.put('/editEmployee/:id', validateRequest(empoyessSchema), editOne);
router.delete('/deleteEmployee/:id', deleteData);

module.exports = router;
