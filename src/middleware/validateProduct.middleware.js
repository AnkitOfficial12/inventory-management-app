const joi = require('joi');
const { errorResponse } = require('../helpers/response.helper');

const productSchema = joi.object({
    name: joi.string().min(3).required(),
    price: joi.number().precision(2).positive().required(),
    description: joi.string().allow(null, ''),
    stock_quantity: joi.number().integer().positive().min(0).required(),
    status: joi.string().valid('ACTIVE', 'INACTIVE').required()
})

module.exports = (req, res, next) => {
    const {error} = productSchema.validate(req.body);
    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }
    next(); // chacking of validationProduct with api is not done (chack it)
};