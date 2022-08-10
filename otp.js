const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const code = "+91";
module.exports = function(phoneNumber,data){client.messages.create({
     body: data,
     from: '+14024336514',
     to: code.concat(phoneNumber.toString())
   })
  .then(message => console.log(message.sid));
}