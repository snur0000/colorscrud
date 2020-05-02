const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true)
//var url = 'mongodb://heroku_hdn28dkz:hnijlen7ntqp334ose358i7jhv@ds133875.mlab.com:33875/heroku_hdn28dkz';
var url = 'mongodb://localhost:27017/colorsDB';

mongoose.connect
(url, { useNewUrlParser: true, useFindAndModify: false}, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./colors.model.js');