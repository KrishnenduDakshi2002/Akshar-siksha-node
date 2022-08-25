const moment = require('moment');

const date = moment('2022-08-25T12:30:41.000Z').utc().format('MMMM Do YYYY, h:mm:ss a');

console.log(date);