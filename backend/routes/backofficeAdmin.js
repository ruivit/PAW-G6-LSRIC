var express = require('express');
var multer = require('multer');
var router = express.Router();

var jwt = require('jsonwebtoken');

var controller = require('../controllers/backofficeControllerAdmin');

//#region Auth
router.use(function (req, res, next) {
    const token = req.cookies.token;

    if (token == null) return res.redirect('/backoffice');

    jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
        if (err) return res.render('error/error', { error: err });

        if (req.session.employee) {
            return res.status(301).redirect('/backoffice/employee');

        } else if (req.session.client) {
            return res.status(200).render('client/indexClient');

        } else {
            next();
        }
    });
});
//#endregion

// Admin Index
router.get('/', controller.backoffice_admin_get);


// ------------------------------ /Backoffice/Admin/Employee
//#region Employee

// Admin Employee Index
router.get('/employee', controller.backoffice_admin_employee_get);

// Admin Employee Create
router.get('/employee/create', controller.backoffice_admin_employee_create_get);
router.post('/employee/create', multer().none(), controller.backoffice_admin_employee_create_post);

// Admin Employee Update
router.get('/employee/update/:id', multer().none(), controller.backoffice_admin_employee_update_get);
router.post('/employee/update', multer().none(), controller.backoffice_admin_employee_update_post);

router.get('/employee/update/password/:id', multer().none(), controller.backoffice_admin_employee_update_password_get);
router.post('/employee/update/password', multer().none(), controller.backoffice_admin_employee_update_password_post);

// Admin Employee Delete
router.post('/employee/delete/:id', multer().none(), controller.backoffice_admin_employee_delete_post);

//#endregion


// ------------------------------ /Backoffice/Admin/Client
//#region Client

// Admin Client Index
router.get('/client', controller.backoffice_admin_client_get);

// Admin Client Create
router.get('/client/create', controller.backoffice_admin_client_create_get);
router.post('/client/create', multer().none(), controller.backoffice_admin_client_create_post);

// Admin Client Update
router.get('/client/update/:id', multer().none(), controller.backoffice_admin_client_update_get);
router.post('/client/update', multer().none(), controller.backoffice_admin_client_update_post);

router.get('/client/update/password/:id', multer().none(), controller.backoffice_admin_client_update_password_get);
router.post('/client/update/password', multer().none(), controller.backoffice_admin_client_update_password_post);

// Admin Client Delete
router.post('/client/delete/:id', multer().none(), controller.backoffice_admin_client_delete_post);

//#endregion


// ------------------------------ /Backoffice/Admin/Book
//#region Book

// Admin Book Index
router.get('/book', controller.backoffice_admin_book_get);

// Admin Book Create
router.get('/book/create', controller.backoffice_admin_book_create_get);
router.post('/book/create', multer().single('cover'), controller.backoffice_admin_book_create_post);

// Admin Book Update
router.get('/book/update/:id', multer().none(), controller.backoffice_admin_book_update_get);
router.post('/book/update/:id', multer().none(), controller.backoffice_admin_book_update_post);

// Admin Book Delete
router.post('/book/delete/:id', multer().none(), controller.backoffice_admin_book_delete_post);

//#endregion


// ------------------------------ /Backoffice/Admin/Sale
//#region Sale

// Admin Sale Index
router.get('/sales', controller.backoffice_admin_sales_get);

// Admin Sale Create
router.get('/sales/makeSale', controller.backoffice_admin_make_sale_get);
router.post('/sales/makeSale', multer().none(), controller.backoffice_admin_make_sale_post);

//#endregion


//#region Points/Discount
// ------------------------------ /Backoffice/Admin/Points

router.get('/managePoints', controller.backoffice_admin_managepoints_get);

router.post('/managePoints', multer().none(), controller.backoffice_admin_managepoints_post);


// ------------------------------ /Backoffice/Admin/Discount

router.get('/manageDiscount', controller.backoffice_admin_managediscount_get);

router.post('/manageDiscount', multer().none(), controller.backoffice_admin_managediscount_post);

//#endregion


//#region proposals
// ------------------------------ /Backoffice/Admin/Proposals ------------------------

router.get('/proposals', controller.backoffice_admin_proposals_get);

// ------------------------------ /Backoffice/Admin/UsedBooks --------------------------

router.get('/usedbook', controller.backoffice_admin_usedbook_get);


// Admin Used Book Create
router.get('/usedbook/create/:id', multer().none(), controller.backoffice_admin_usedbook_create_get);
router.post('/usedbook/create/:id', multer().none(), controller.backoffice_admin_usedbook_create_post);

// Admin Used Book Update
router.get('/usedbook/update/:id', multer().none(), controller.backoffice_admin_usedbook_update_get);
router.post('/usedbook/update/:id', multer().none(), controller.backoffice_admin_usedbook_update_post);

// Admin Book Delete
router.post('/usedbook/delete/:id', multer().none(), controller.backoffice_admin_usedbook_delete_post);


module.exports = router;

