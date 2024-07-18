const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const cartsFilePath = path.join(__dirname, '../data/carrito.json');
const productsFilePath = path.join(__dirname, '../data/productos.json');

const readCartsFile = () => {
    const data = fs.readFileSync(cartsFilePath);
    return JSON.parse(data);
};

const writeCartsFile = (data) => {
    fs.writeFileSync(cartsFilePath, JSON.stringify(data, null, 2));
};

const readProductsFile = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

router.get('/', (req, res) => {
    const carts = readCartsFile();
    res.json(carts);
});

router.post('/', (req, res) => {
    const carts = readCartsFile();
    const newCart = { id: Date.now().toString(), products: [] };
    carts.push(newCart);
    writeCartsFile(carts);
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const carts = readCartsFile();
    const cart = carts.find(c => c.id == req.params.cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const carts = readCartsFile();
    const products = readProductsFile();
    const cart = carts.find(c => c.id == req.params.cid);
    const product = products.find(p => p.id == req.params.pid);
    if (cart && product) {
        const cartProduct = cart.products.find(p => p.product == req.params.pid);
        if (cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.products.push({ product: req.params.pid, quantity: 1 });
        }
        writeCartsFile(carts);
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Cart or Product not found' });
    }
});

// Actualizar cantidad de producto en carrito
router.put('/:cid/product/:pid', (req, res) => {
    const { quantity } = req.body;
    const carts = readCartsFile();
    const cart = carts.find(c => c.id == req.params.cid);
    if (cart) {
        const cartProduct = cart.products.find(p => p.product == req.params.pid);
        if (cartProduct) {
            cartProduct.quantity = quantity;
            writeCartsFile(carts);
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } else {
        res.status(404).json({ message: 'Cart not found' });
    }
});

// Eliminar carrito completo
router.delete('/:cid', (req, res) => {
    let carts = readCartsFile();
    carts = carts.filter(c => c.id != req.params.cid);
    writeCartsFile(carts);
    res.status(204).end();
});

module.exports = router;
