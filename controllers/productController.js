const {Product, validate} = require('../models/product');

const getAllProducts = async (req, res, next) => {
    const list = await Product.find().exec();
    res.render('productlist', {
        products: list
    });
}

const getOneProduct = async (req, res, next) => {
    try {
        const productIdentifier = req.params.productIdentifier;
        if (!productIdentifier) {
            return res.status(400).send('Product number or name is required');
        }
        
        // Check if the productIdentifier is a number (product number) or a string (product name)
        const query = isNaN(productIdentifier) 
            ? { name: productIdentifier } 
            : { productnumber: productIdentifier };

        const product = await Product.findOne(query).exec();
        
        if (!product) {
            return res.status(404).send('Product not found');
        }
        
        res.render('productlist', { products: [product] });
    } catch (error) {
        res.status(500).send(error.message);
    }
}



const getAddProductView = (req, res, next) => {
    res.render('addProduct');
}

const addProduct = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    let product = await new Product({
        name: data.name,
        productnumber: data.productnumber,
        trademark: data.trademark,
        newprice: data.newprice,
        oldprice: data.oldprice,
        size: data.size,
        color: data.color,
        quantity: data.quantity,
        description: data.description
    });
    product = await product.save();
    res.redirect('/');
}

const getUpdateProductView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneproduct = await Product.findById(id).exec();
        res.render('updateProduct', {
            product: oneproduct
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProduct = async(req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const data = req.body;
    let product = await Product.findByIdAndUpdate(id, {
        name: data.name,
        productnumber: data.productnumber,
        trademark: data.trademark,
        newprice: data.newprice,
        oldprice: data.oldprice,
        size: data.size,
        color: data.color,
        quantity: data.quantity,
        description: data.description
    }, {new: true});
    if(!product) return res.status(404).send('Product with the given id not found');

    res.redirect('/');
}

const getDeleteProductView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneproduct = await Product.findById(id).exec();
        res.render('deleteProduct', {
            product: oneproduct
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndRemove(id);
        if(!product) return res.status(404).send('Product with the given id not found');
        res.redirect('/');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllProducts,
    getOneProduct,
    getAddProductView,
    addProduct,
    getUpdateProductView,
    updateProduct,
    getDeleteProductView,
    deleteProduct
}