const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

require('dotenv/config');
const client = require('twilio')(accountSid, authToken);


const countrycode = "+91";
module.exports = function twilio_msg(phoneNumber,data){client.messages.create({
     body: data,
     from: '+14024336514',
     to: countrycode.concat(phoneNumber.toString())
   })
  .then(message => console.log(message.sid));
}
