'use strict'

var Order = require('./order.model');

/*
    API to return the list of orders.
*/
exports.index = function(req,res){
	Order.find({}, function(error, orders){
		(error) ? res.json(500,error) : res.json(200,orders);
	})
}


/*
    API To create new order.
*/
exports.create = function(req,res){
    var newOrder = new Order(req.body);
    newOrder.save(function(error,result){
        (error) ? res.json(500,error) : res.json(201);      
    })    
}


/*
    API To get order detail by id.
*/
exports.orderDetail = function(req,res){
    var id  = req.params.id || '';
    Order.findById(id,function(error,order){
        (error) ? res.json(500,error) : res.json(200, order);
    })
}

/*
    API to cancel the order.
*/
exports.cancelOrder = function(req,res){
    var id = req.params.id || '';
    Order.findById(id,function(error,order){
        order = (order)? order.status="cancel"  : res.json(error);
        order.save(function(error,result){
            (error) ? res.json(500,error) : res.json(201 ,result);
        })
    })
}

/*
  API to delete order by ID.
*/
exports.deleteOrder = function(req,res){
    var id = req.params.id || '';
    Order.findByIdAndRemove(id,function(error,result){
        (error) ? res.json(error) : res.json(204);
    })
}
