const mongoose = require('mongoose');

var colorsSchema = new mongoose.Schema({
    favColor: {
        type: String,
        required: 'This field is required.'
});

mongoose.model('Colors', colorsSchema);
