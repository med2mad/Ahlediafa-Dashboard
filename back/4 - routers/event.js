const router = require('express').Router();
const { eventValidation, idValidation } = require('../1 - configurations/validations');

//controller functions
const {get, post, put, remove, setAssociations, getYearProfits} = require('../3 - controllers/event');

//API endpoints
router.get('/', get);
router.get('/chart', getYearProfits);
router.post('/', eventValidation(), post);
router.put('/:id', idValidation(), eventValidation(), put);
router.put('/associations/:id', idValidation(), setAssociations);
router.delete('/:id', idValidation(), remove);

module.exports = router;