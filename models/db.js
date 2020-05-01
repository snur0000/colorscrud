const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true)
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/heroku_9h0sbqw6';
mongoose.connect
(url, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./skater.model');