var express = require('express');
var multer = require('multer');
var router = express.Router();

var jwt = require('jsonwebtoken');

var controller = require('../controllers/backofficeControllerEmployee');


router.use(function (req, res, next) {
    const token = req.cookies.token;

    if (token == null) return res.redirect('/backoffice');

    jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
        if (err) return res.render('error/error', { error: err });

        if (req.session.admin) {
            return res.status(301).redirect('/backoffice/admin');

        } else if (req.session.client) {
            return res.status(200).render('client/indexClient');
            
        } else {
            next();
        }
    });
});


// employee Index
router.get('/', controller.backoffice_employee_get);


// ------------------------------ employee/Client URL

// employee Client Index
router.get('/client', controller.backoffice_employee_client_get);

// employee Client Create
router.get('/client/create', controller.backoffice_employee_client_create_get);
router.post('/client/create', multer().none(), controller.backoffice_employee_client_create_post);

// employee Client Update
router.get('/client/update/:id', multer().none(), controller.backoffice_employee_client_update_get);
router.post('/client/update/:id', multer().none(), controller.backoffice_employee_client_update_post);

// employee Client Delete
router.post('/client/delete/:id', controller.backoffice_employee_client_delete_post);




// ------------------------------ employee/Book URL

// employee Book Index
router.get('/book', controller.backoffice_employee_book_get);

// employee Book Create
router.get('/book/create', controller.backoffice_employee_book_create_get);
router.post('/book/create', multer().none(), controller.backoffice_employee_book_create_post);

// employee Book Update
router.get('/book/update/:id', multer().none(), controller.backoffice_employee_book_update_get);
router.post('/book/update/:id', multer().none(), controller.backoffice_employee_book_update_post);

// employee Book Delete
router.post('/book/delete/:id', controller.backoffice_employee_book_delete_post);

// ------------------------------ employee/Sale URL

// employee Sale Index
router.get('/sales', controller.backoffice_employee_sale_get);

// employee Sale Create
router.get('/sales/makesale', controller.backoffice_employee_make_sale_get);
router.post('/sales/makesale', multer().none(), controller.backoffice_employee_make_sale_post);


// ------------------------------ employee/ProfileUpdate URL

// Employee Profile Update
router.get('/profile', controller.backoffice_employee_manageProfile_get);

router.get('/profile/update/', controller.backoffice_employee__profile_update_get);

router.post('/profile/update', multer().none(), controller.backoffice_employee_profile_update_post);

router.get('/update/password/:id', multer().none(), controller.backoffice_employee_update_password_get);
router.post('/update/password', multer().none(), controller.backoffice_employee_update_password_post);

module.exports = router;