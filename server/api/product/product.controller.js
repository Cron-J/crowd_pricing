'use strict'

var express = require('express'),
    app = express(),
    Product = require('./product.model'),
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
function getRandProdt(arr){

        
    async.auto({
        one: function(callback){
            category.find({}, function(error, categories){   
                // (error) ? res.json(500,error) : res.json(200,categories);     
                for(var i in categories)
                {
                    callback(null, categories[i]["_id"])
                }
            });
        }, 
        // If two does not depend on one, then you can remove the 'one' string
        //   from the array and they will run asynchronously (good for "parallel" IO tasks)
        two: ['one', function(callback, results){
            Product.find({'category':id},{'group': 'category'},function(errors,products){
                        // pop(products[Math.floor(Math.random() *products.length)]);
                        var resp=products[Math.floor(Math.random() *products.length)]
                        callback(null,resp)
            });
        }]
        
    },  function(err, results) {
            console.log('err = ', err);
            console.log('results = ', results);
            arr(results);
    });
        

}