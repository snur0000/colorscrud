const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true)
 //var url = 'mongodb://snur0000@email.cpcc.edu:@Barbie101@ds133875.mlab.com:33875/heroku_hdn28dkz'
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/heroku_hdn28dkz';
mongoose.connect
(url, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./colors.model');