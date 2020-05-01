const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true)
mongoose.connect
('mongodb://localhost:27017/skateDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./skater.model');