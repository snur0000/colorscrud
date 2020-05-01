const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Colors = mongoose.model('Colors');

router.get('/', (req, res) => {
    res.render("colors/addOrEdit", {
        viewTitle: "What is your favorite color? :)"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var colors = new Colors();
    colors.favColor = req.body.favColor;

    colors.save((err, doc) => {
        if (!err)
            res.redirect('colors/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("colors/addOrEdit", {
                    viewTitle: "Insert favorite color  :)",
                    colors: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Colors.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('colors/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("colors/addOrEdit", {
                    viewTitle: 'Update Colors',
                    colors: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Colors.find((err, docs) => {
        if (!err) {
            res.render("colors/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving colors list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'favColor':
                body['favColorError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Colors.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("colors/addOrEdit", {
                viewTitle: "Update Colors",
                colors: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Colors.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/colors/list');
        }
        else { console.log('Error in colors delete :' + err); }
    });
});

module.exports = router;