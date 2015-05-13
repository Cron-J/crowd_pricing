var nodemailer = require("nodemailer");

/*
 * Common error object created
*/
var errorResponse = function (message, code) {
  var error = {
    code: code || 401,
    message: message,
  };
  return error;
};
  var transporter  = nodemailer.createTransport("SMTP", {
      service: "Gmail",
      auth: {
        user: 'karan@cronj.com',
        pass: 'Admin123#'
      }
    });

var toSendMail = function(req , res , mailOptions){
    transporter .sendMail(mailOptions, function (error, response) {
    if (error) {
      res.json(401, errorResponse("Not able to send mail.", 401));
    } else {
      res.json(200, errorResponse("You have registered successfully. Please check your email to verify your email address!", 200));
    }
  });
};

var emailForVerification = function(req , res , link , address){ 
  var mailOptions = {
    from: "karan@cronj.com", // sender address
    to: address,
    subject: "Crowd Pricing Email Verification", // Subject line
    html: "<p>Welcome and thanks for Registering on Crowd Pricing</p><p>Please verify your email by clicking on the verification link below.<br/><a href=\"" +link + "\">" + link + "</a></p>"
  };
  // send mail with defined transport object
  toSendMail(req , res , mailOptions);
};

exports.emailForVerification  = emailForVerification;