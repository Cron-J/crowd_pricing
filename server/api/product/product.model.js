var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    db = mongoose.connection,
    Timestamp = require('../../utils/timestamp').Timestamp;

autoIncrement.initialize(db);

/**
 * @module  Product
 */

var Product = new Schema({
    productId: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },   
    desc:{
        type:String
    },
    specifications:{
        size:String,
        weight:String,
        color:String,
        dimensions:String,
        guarantee:String
    },
    category: [{type:String , ref: 'Category'}],   
    productImages:[{
        type:String
    }],
    marketPrice:{
        type:Number
    },
    stores:[{
        price:Number,
        link:String,
        name:String,
        icon:String,
        reviews:[{
            username:{type:String},
            review:{type:String},
            title:{type:String},
            rating:{type:String}
        }]
    }],
    priceSlabs:[{
        type:{type:Number},
        range:{type:Number},
        price:{type:Number}
    }],
    expDate:{type:Date},
    city:{type:String},
    status:{type:String,enum:['closed','open','processing']},
    rewardUnit:{type:Number},
    announcements:[{
                    announcementType:{type:String,enum:['email','groupsms','website']}
                }],

    timestamp: Timestamp

});
/* creating new or updating timestamp*/
Product.pre('save', function(next){
  now = new Date();
  this.timestamp.updatedOn = now;
  if ( !this.timestamp.createdOn ) {
    this.timestamp.createdOn = now;
  }
  next();
});

Product.plugin(autoIncrement.plugin, {
    model: 'product',
    field: 'productId'
});

/** export schema */
module.exports = mongoose.model('product', Product);