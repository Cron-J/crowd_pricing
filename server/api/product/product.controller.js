'use strict'

var express = require('express'),
    app = express(),
    Product = require('./product.model'),
    fs = require('fs'),
    mapper = require('./product.mapping');



/*
    API to return the list or products.
*/
exports.index = function(req,res){
	Product.find({}, function(error, products){
		(error) ? res.json(500,error) : res.json(200,products);
	})
}


/*
    API To create new product.
*/
exports.create = function(req,res){
    var newProduct = new Product(req.body);
    newProduct.save(function(error,result){
        (error) ? res.json(500,error) : res.json(201);      
    })    
}


/*
    API To get product detail by id.
*/
exports.productDetail = function(req,res){
    var id  = req.params.id || '';
    Product.findById(id,function(error,product){
        (error) ? res.json(500,error) : res.json(200, product);
    })
}


/*
    API to update product by id.
*/
exports.updateProduct = function(req,res){
    var id = req.params.id || '';
    Product.findById(id,function(error,product){
        if(product){
            var updatedProduct = mapper.productDetail(req.body,product);
            updatedProduct.save(function(error,result){
                (error) ? res.json(500,error) : res.json(200,result)
            })
        }
    })
}

/*
    API to get product list by category.
*/
exports.productByCategory = function(req,res){
    var category = req.params.category || '';
    Product.find({'category':{ $in: [category] } },function(error,product){
        (error) ? res.json(500,error) : res.json(200, product);
    })
}

/*
    API to delete Product by id.
*/
exports.deleteProduct = function(req,res){
    var id = req.params.id || '';
    Product.findByIdAndRemove(id , function(error,result){
        (error) ? res.json(500,error) : res.json(204,result);
    })
}