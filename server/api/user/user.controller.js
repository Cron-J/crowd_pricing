'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var mails = require('../../utils/mails');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.vtoken = token;
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var link = "http://localhost:9000/login?id"+user._id + "&token=" + user.token;
    mails.emailForVerification(req,res,link,user.email);
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */

 exports.editProfile = function(req, res, next) {
  var userId = req.user._id;
  var name = String(req.body.name);
  var age = String(req.body.age);
  var gender = String(req.body.gender);
  var contactNumber = String(req.body.contactNumber);
  var address = String(req.body.address);

  User.findById(userId, function (err, user) {
    if(user.authenticate(email)) {
      user.name = name;
      user.age=age;
      user.gender=gender;
      user.contactNumber=contactNumber;
      user.address=address;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};



/**
 * Email & Token Verification
 */
exports.tokenVerification = function(req, res, next) {
  if(req.body.token) {
    User.findById(req.body.userId, function(err, user) {
      if(err) return res.json(500, err);
      if(!user) return res.json(401, "No user Found");
      else{
        user.isActive = true;
        user.save(function(err , user) {
          (err) ?  res.json(err) : res.json(200,"your email address is verified.") ;
        });
      } 
    });
  } else {
    res.json(401,"User identification is missing..!");
  }
  
};
/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
