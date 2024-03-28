const express = require('express');
const {getAllProducts, getAddProductView, addProduct, getOneProduct,
getUpdateProductView, updateProduct, getDeleteProductView, deleteProduct} = require('../controllers/productController');


const router = express.Router();

router.get('/', getAllProducts);
router.get('/searchProduct/:productIdentifier',getOneProduct);
router.get('/addProduct', getAddProductView);
router.post('/addProduct', addProduct);
router.get('/updateProduct/:id', getUpdateProductView);
router.post('/updateProduct/:id', updateProduct);
router.get('/deleteProduct/:id', getDeleteProductView);
router.post('/deleteProduct/:id', deleteProduct);

module.exports = {
    routes: router
}