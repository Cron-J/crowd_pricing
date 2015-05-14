'use strict'

var express = require('express');
var controller = require('./product.controller');
var router = express.Router();

router.get('/' , controller.index);
router.get('/featuredProducts' , controller.selectRandCatProdt);
router.get('/product/:id', controller.productDetail);
router.get('category/:category',controller.productByCategory);
router.get('/featured', controller.selectRandCatProdt);
router.post('/create', controller.create);
router.put('/product/:id', controller.updateProduct);
router.delete('/product/:id', controller.deleteProduct);

module.exports = router;