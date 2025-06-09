const Joi = require("joi");

const employeeSchema = Joi.object({
    employeeId: Joi.number().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required()
        .messages({
            "string.email": "Invalid email format",
            "string.pattern.base": "Email must be a valid format",
        }),
    phone: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone must be a valid 10-digit Indian number",
        }),
    position: Joi.string().required(),
    department: Joi.string().required(),
    hireDate: Joi.string().required(),
});

module.exports = employeeSchema;
