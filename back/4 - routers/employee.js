const router = require('express').Router();
const { employeeValidation, idValidation } = require('../1 - configurations/validations');

//controller functions
const {get, post, put, remove} = require('../3 - controllers/employee');

//API endpoints
router.get('/', get);
router.post('/', employeeValidation(), post);
router.put('/:id', idValidation(), employeeValidation(), put);
router.delete('/:id', idValidation(), remove);

module.exports = router;