const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        
        const formattedErrors = {};

        errors.array().forEach(err => {
            // Only take first error per field
            if (!formattedErrors[err.path]) {
                formattedErrors[err.path] = err.msg;
            }
        });

        return res.status(400).json({
            success: false,
            message: "Validation errors",
            errors: formattedErrors
        });
    }

    next();
};