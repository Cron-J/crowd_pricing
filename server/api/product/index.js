'use strict'

var express = require('express');
var controller = require('./product.controller');
var router = express.Router();
var app = express();

router.get('/' , controller.index);
router.post('/create', controller.create);
router.get('/product/:id', controller.productDetail);
router.put('/product/:id', controller.updateProduct);

module.exports = router;