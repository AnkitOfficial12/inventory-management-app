const Product = require("../models/products.model");
const { errorResponse, successResponse } = require("../helpers/response.helper");
const { parse } = require("dotenv");

exports.getProducts = async (req, res) => {
    try{
        const {status, search, page, limit, sort_by, order} = req.query;
        const products = await Product.getAll({status, search, page: parseInt(page, 10), limit: parseInt(limit, 10), sort_by, order});
        return successResponse(res, products, 'Products retrieved successfully', 200);
        // const products = await Product.getAll();
    }catch (error) {
        return errorResponse(res, error.message, 500);
    }
}

exports.createProduct = async (req, res) => {
    try{
        const product = await Product.create(req.body);
        return successResponse(res, product, 'Product created successfully', 200);
    }catch (error) {
        return errorResponse(res, error.message, 500);
    }
}

exports.updateProduct = async (req, res) => {
    try{
        const product = await Product.update(req.params.id, req.body);
        if(!product || product.length == 0 ) {
            return successResponse(res, product, 'Product updated successfully', 200);
        }
    }catch (error) {
        return errorResponse(res, error.message, 500);
    }
}