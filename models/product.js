const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    productnumber: {
        type: String,
        required: true
    },
    trademark: {
        type: String,
        required: true
    },
    newprice: {
        type: String,
        required: true
    },
    oldprice: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

const validateProduct = (product) => {
    const schema = {
        name: Joi.string().required(),
        productnumber: Joi.string().required(),
        trademark: Joi.string().required(),
        newprice: Joi.string().required(),
        oldprice: Joi.string().required(),
        size: Joi.string().required(),
        color: Joi.string().required(),
        quantity: Joi.string().required(),
        description: Joi.string().required()
    }

    return Joi.validate(product, schema);
}


module.exports.Product = Product;
module.exports.validate = validateProduct;