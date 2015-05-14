'use strict'

var express = require('express');
var controller = require('./order.controller');
var router = express.Router();

router.get('/' , controller.index);
router.get('/order/:id', controller.orderDetail);
router.post('/order', controller.create);
router.put('/order/cancel/:id', controller.cancelOrder);
router.delete('/order/:id', controller.deleteOrder);

module.exports = router;