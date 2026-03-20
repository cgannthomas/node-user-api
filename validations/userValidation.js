const { body } = require('express-validator');

exports.createUserValidation = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Valid email is required'),
    body('role')
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['user', 'admin'])
        .withMessage('Invalid role')
];