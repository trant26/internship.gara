var express = require('express');
var router = express.Router();


router.get('/register', function(req, res, next){
    res.render('register', {success: false, errors: req.session.errors});
    res.session.errors = null;
})

router.post('/submit', function(req, res, next){

});

module.exports = router;