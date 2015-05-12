'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  sub: Array,
  active: Boolean
});

module.exports = mongoose.model('Category', CategorySchema);