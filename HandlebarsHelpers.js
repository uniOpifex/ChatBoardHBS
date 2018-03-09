const hbs = require('hbs')
const moment = require('moment');


hbs.registerHelper('niceDate', function (dateTime) {
  return moment(dateTime).format('D MMM YYYY @ H:mm');
});


hbs.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

hbs.registerHelper('momnet', function(dateTime){
  
})