var express = require('express');
var multer = require('multer');
var router = express.Router();


var Book = require('../models/bookModel');


/* GET home page. */
router.get('/', function (req, res, next) {  
    res.render('index', { title: 'Express' });
});


module.exports = router;
