var express = require('express');
var multer = require('multer');
var router = express.Router();


var clientAPIController = require('../controllers/clientAPIController');


// ------------------------------ Angular/ ---------------------------

router.post('/register', clientAPIController.client_register_post);

router.post('/login', clientAPIController.client_login_post);

router.get('/books', multer().none(), clientAPIController.client_new_books_get);

router.get('/clientPoints', multer().none(), clientAPIController.client_points_get);
router.get('/pointsTable', clientAPIController.points_table_get);
router.get('/discountTable', clientAPIController.discount_table_get);

router.post('/makeSale', multer().none(), clientAPIController.client_make_sale_post);

router.post('/sellbook', multer().none(), clientAPIController.client_sell_tempbook_post);

router.get('/clientSales', multer().none(), clientAPIController.client_sales_get);
router.get('/clientSoldBooks', multer().none(), clientAPIController.client_soldbooks_get);

router.post('/updatePassword', multer().none(), clientAPIController.client_update_password);

router.get('/search', multer().none(), clientAPIController.client_search_get);

router.get('/rateBook', multer().none(), clientAPIController.client_rate_book);

router.get('/getSale', multer().none(), clientAPIController.client_specific_sale_get);

module.exports = router;
