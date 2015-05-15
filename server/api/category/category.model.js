'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    db = mongoose.connection,
    Timestamp = require('../../utils/timestamp').Timestamp;

var Category = new Schema({
  categoryId: {
    type: Number,
    unique: true,
    required: true
  },
  name: String,
  sub: Array,
  active: {type:Boolean, default:true},
  timestamp: Timestamp
});


Category.plugin(autoIncrement.plugin, {
    model: 'category',
    field: 'categoryId'
});

module.exports = mongoose.model('category', Category);