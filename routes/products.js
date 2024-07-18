const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const readProductsFile = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

const writeProductsFile = (data) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2));
};

router.get('/', (req, res) => {
    const products = readProductsFile();
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

router.get('/:pid', (req, res) => {
    const products = readProductsFile();
    const product = products.find(p => p.id == req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

router.post('/', (req, res) => {
    const products = readProductsFile();
    const newProduct = { ...req.body, id: Date.now().toString(), status: true };
    products.push(newProduct);
    writeProductsFile(products);
    res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
    let products = readProductsFile();
    const productIndex = products.findIndex(p => p.id == req.params.pid);
    if (productIndex !== -1) {
        const updatedProduct = { ...products[productIndex], ...req.body };
        products[productIndex] = updatedProduct;
        writeProductsFile(products);
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

router.delete('/:pid', (req, res) => {
    let products = readProductsFile();
    products = products.filter(p => p.id != req.params.pid);
    writeProductsFile(products);
    res.status(204).send();
});

module.exports = router;
