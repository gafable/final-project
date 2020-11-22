const Joi = require('joi')

const AccountRule = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

module.exports = AccountRule