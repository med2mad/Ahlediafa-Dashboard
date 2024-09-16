const { body, query, param, validationResult } = require('express-validator');

const querySanitizer = function () {
    return [query('name').trim().default(''), query('month').trim().default(''), query('skip').default(0), query('limit').default(5)];
}

const idValidation = function () {
    return [
        param('id').trim().isInt(),
        (req, res, next)=>{
            if(validationResult(req).isEmpty()){ next(); }else{ res.send({"errors":validationResult(req).errors}); }
        }
    ];
}
const eventValidation = function () {
    return [
        body('title').trim().isLength({min:1}),
        body('completion').trim().default(0).isInt({min:0, max:100}),
        body('profit').trim().default(0).isFloat(),
        (req, res, next)=>{
            if(validationResult(req).isEmpty()){ next(); }else{ res.send({"errors":validationResult(req).errors}); }
        }
    ];
}

function employeeValidation() {
    return [
        body('name').trim().isLength({min:1}),
        (req, res, next)=>{
            if(validationResult(req).isEmpty()){ next(); }else{ res.send({"errors":validationResult(req).errors}); }
        }
    ];
}

const signupValidation = function () {
    return [
        body('username').trim().isLength({min:5, max:10}),
        body('password1').trim().isLength({min:5, max:10}),
        body('password2').custom((value, { req }) => {
            if (value !== req.body.password1) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
        (req, res, next)=>{
            if(validationResult(req).isEmpty() ){ next(); }else{ res.send({"errors":validationResult(req).errors}); }
        }
    ];
}
const updateUserValidation = function () {
    return [
        body('username').trim().isLength({min:5, max:10}),
        (req, res, next)=>{
            if(validationResult(req).isEmpty() ){ next(); }else{ res.send({"errors":validationResult(req).errors}); }
        }
    ];
}
const updatePasswordValidation = function () {
    return [
        body('password1').trim().isLength({min:5, max:10}),
        body('password2').custom((value, { req }) => {
            if (value !== req.body.password1) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
        (req, res, next)=>{
            if(validationResult(req).isEmpty() ){ next(); }else{ res.send({"errors":validationResult(req).errors}); }
        }
    ];
}

module.exports = { eventValidation, employeeValidation, signupValidation, updateUserValidation, updatePasswordValidation, querySanitizer, idValidation };