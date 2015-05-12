'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'crowdpricing-secret',

  FACEBOOK_ID:      '418340524994743',
  FACEBOOK_SECRET:  '1bc6a3da7bf257c914644a1b16b60825',

  TWITTER_ID:       'zjrNZTm6jUtdqRNChdXM8R6Rv',
  TWITTER_SECRET:   'BNasAXPsqbm7WAeUdb6IN5VvcH7p1fSpEZHCV3Aw43HpwPxggs',

  GOOGLE_ID:        'AIzaSyDWM5wQNeNO-tWFbFQjjFg_c7e_HQL9TmU',
  GOOGLE_SECRET:    'LzrkFveUDlRBcQbDg_bNYZ5u',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
