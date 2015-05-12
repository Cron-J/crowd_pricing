'use strict';

var _ = require('lodash');
var Category = require('./category.model');

// Get list of Category
exports.index = function(req, res) {
  Category.find(function (err, categories) {
    if(err) { return handleError(res, err); }
    return res.json(200, categories);
  });
};

// Get a single Category
exports.show = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    return res.json(category);
  });
};

// Creates a new Category in the DB.
exports.create = function(req, res) {
  Category.create(req.body, function(err, category) {
    if(err) { return handleError(res, err); }
    return res.json(201, category);
  });
};

// Updates an existing Category in the DB.
exports.update = function(req, res) {
  
};

// Deletes a Category from the DB.
exports.destroy = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    category.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}