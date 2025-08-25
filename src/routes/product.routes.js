const express = require('express');
const { createProduct, getProducts, updateProduct } = require("../controllers/products.controller");
const authMiddleware = require('../middleware/auth.middleware');
const rbacMiddleware = require('../middleware/rbac.middleware');
const validateProduct = require('../middleware/validateProduct.middleware');

const router = express.Router();

router.post('/',
    authMiddleware,
    rbacMiddleware(['ADMIN', 'SALES_MANAGER']), // Only the admin and sales manger can create the product
    validateProduct,
    createProduct);
router.get('/', authMiddleware, getProducts);
router.put('/:id',
    authMiddleware,
    rbacMiddleware(['ADMIN', 'SALES_MANAGER']), 
    validateProduct,
    updateProduct);

module.exports = router;