'use strict'

var express = require('express'),
    app = express(),
    Product = require('./product.model'),
    category = require('../category/category.model'),
    fs = require('fs'),
    mapper = require('./product.mapping'),
    async=require('async');




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

exports.selectRandCatProdt=function(req,res){
    // var arr=[];
   getRandProdt(function(arr){
    // console.log("========",arr);
    (errors) ? res.json(500,errors) : res.json(200,arr);
    });
}
exports.selectRandCatProdt=function(req,res){
   getRandProdt(function(err,arr){
      arr=arr.filter(function(n){ return n!=null });
      (err) ? res.json(500,err) : res.json(200,arr);
    });
}
function getRandProdt(arr){  
    category.find({}, function(error, categories){    
        async.map(categories,getProduct, function(err,result) {
              arr(null,result);     
        });
        function getProduct(categoryList, callback) {
            setTimeout(function() {
            var ids=categoryList["categoryId"];
                Product.find({'category':ids},{},function(errors,products){
                    if(products!=null && products!=[] && products!='undefined')
                    {   
                        var resp=products[Math.floor(Math.random() *products.length)]; 
                        callback(null,resp);                        
                    }

                });    
            }, 1000);
        }

    });
}