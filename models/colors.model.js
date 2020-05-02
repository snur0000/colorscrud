const mongoose = require('mongoose');

var colorsSchema = new mongoose.Schema({
    favColor: {
        type: String,
        required: 'This field is required.'
<<<<<<< HEAD
    }
});


mongoose.model('Colors', colorsSchema);
=======
});

mongoose.model('Colors', colorsSchema);
>>>>>>> 7a3f7e8d12413ee6f0a6185c5bc91f450800db5a
