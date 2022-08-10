var nodemailer = require('nodemailer');
require('dotenv/config');

let SENDER_USER_PASSWORD = process.env.MAIL_APP_PASSWORD;


module.exports = function send_email(subject,body,recipent){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'braincells.aarkss@gmail.com',
          pass: SENDER_USER_PASSWORD
        }
      });

    var mailOptions = {
        from: 'braincells.aarkss@gmail.com',
        to: recipent,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });

}



