const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Skater = mongoose.model('Skater');

router.get('/', (req, res) => {
    res.render("skater/addOrEdit", {
        viewTitle: "Join our skate team :)"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var skater = new Skater();
    skater.fullName = req.body.fullName;
    skater.email = req.body.email;
    skater.mobile = req.body.mobile;
    skater.city = req.body.city;
    skater.save((err, doc) => {
        if (!err)
            res.redirect('skater/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("skater/addOrEdit", {
                    viewTitle: "Insert Skater",
                    skater: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Skater.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('skater/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("skater/addOrEdit", {
                    viewTitle: 'Update Skater',
                    skater: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Skater.find((err, docs) => {
        if (!err) {
            res.render("skater/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving skater list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Skater.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("skater/addOrEdit", {
                viewTitle: "Update Skater",
                skater: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Skater.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/skater/list');
        }
        else { console.log('Error in skater delete :' + err); }
    });
});

module.exports = router;