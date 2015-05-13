var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    db = mongoose.connect()
    Timestamp = require('../../utils/timestamp').Timestamp;

autoIncrement.initialize(db);

/**
 * @module  User
 */

var Order = new Schema({

    orderId: {
        type: Number,
        unique: true,
        required: true
    },
    productId: {
        type: Number,
        required: true,
        ref:'product'
    },
    userId:{
        type:String,
        required: true,
        ref:'user'
    }, 
    status:{type:String,enum:['cancel','processing','complete']},
    finalReward:{type:Number},
    timestamp : Timestamp
});


/* creating new or updating timestamp*/
Order.pre('save', function(next){
  now = new Date();
  this.timestamp.updatedOn = now;
  if ( !this.timestamp.createdOn ) {
    this.timestamp.createdOn = now;
  }
  next();
});

Order.plugin(autoIncrement.plugin, {
    model: 'order',
    field: 'orderId'
});

/** export schema */
module.exports = mongoose.model('order', Order);