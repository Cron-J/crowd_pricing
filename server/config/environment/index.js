'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  console.log('process',process);
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'crowd-pricing-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    // clientID:     process.env.FACEBOOK_ID || 'id',
    // clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    // callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
    clientID:     '463529963825590',
    clientSecret: 'a25adc5210461940d10dac1ee2f535b8',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    // clientID:     process.env.TWITTER_ID || 'id',
    // clientSecret: process.env.TWITTER_SECRET || 'secret',
    // callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
    clientID:     'zjrNZTm6jUtdqRNChdXM8R6Rv',
    clientSecret: 'BNasAXPsqbm7WAeUdb6IN5VvcH7p1fSpEZHCV3Aw43HpwPxggs',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    // clientID:     process.env.GOOGLE_ID || 'id',
    // clientSecret: process.env.GOOGLE_SECRET || 'secret',
    // callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
    clientID:     '584635618434-mrd36clm6s2op3rs4gcj31ddmut8l8br.apps.googleusercontent.com',
    clientSecret: '-8tnAIQT--lu8Oy_TzRoExdK',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});