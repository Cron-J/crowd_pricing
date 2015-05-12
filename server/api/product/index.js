'use strict'

var express = require('express');
var controller = require('./product.controller');
var router = express.Router();
var app = express();

router.get('/' , controller.index);
router.post('/create', controller.create);
router.get('/product/:id', controller.productDetail);
router.put('/product/:id', controller.updateProduct);

/*Configure the multer.*/

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));
module.exports = router;