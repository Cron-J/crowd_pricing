'use strict'

var express = require('express');
var controller = require('./order.controller');
var router = express.Router();

router.get('/' , controller.index);
router.post('/order', controller.create);
router.get('/order/:id', controller.orderDetail);
router.put('/order/:id', controller.orderCancel);
router.delete('/order/:id', controller.deleteOrder);

module.exports = router;