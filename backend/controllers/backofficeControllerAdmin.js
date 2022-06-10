var crypto = require('crypto');
var fs = require('fs');

const pointsIDcollection = "628f8e0357a2e0f1b8541354";
const discountIDcollection = "628f8d9857a2e0f1b8541351";


// ----------------------- Models ------------------------------
var Employee = require('../models/employeeModel');
var Client = require('../models/clientModel');

var Book = require('../models/bookModel');
var TempBook = require('../models/tempBookModel');
var UsedBook = require('../models/usedBookModel');
var Author = require('../models/authorModel');
var Editor = require('../models/editorModel');

var Sale = require('../models/saleModel');
var Points = require('../models/pointsModel');
var Discount = require('../models/discountModel');


// ------------------- Auxiliary Functions ---------------------------
function getDateNow(date) {
    var d = new Date();
    dateNowString = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return dateNowString;
}

// --------------------- Backoffice/Admin/ ---------------------------
    
exports.backoffice_admin_get = function (req, res) {    
    res.render('backoffice/backofficeIndex', { admin: true });
}; // Get the admin portal (after login)



// --------------------- Backoffice/Admin/Employee ---------------------------
//#region Employee

exports.backoffice_admin_employee_get = async function (req, res) {
    async function pagination(req, totalDocs) {
        var perPage = 5;
        var totalPages = Math.ceil(totalDocs / perPage);
        
        var pageNumber = (req.query.page == null) ? 1 : req.query.page;
        var startFrom = (pageNumber - 1) * perPage;
        
        // convert pageNumber to integer
        pageNumber = parseInt(pageNumber);
        return { perPage: perPage, totalPages: totalPages, pageNumber: pageNumber, startFrom: startFrom };
    }

    var pD, totalDocs, employees;
    try {
        if (req.query.search) {
            totalDocs = await Employee.countDocuments({ $or: [
                { username: { $regex: req.query.search, $options: 'i' } },
                { name: { $regex: req.query.search, $options: 'i' } },
            ] });

            pD = await pagination(req, totalDocs);

            employees = await Employee.find({ $or: [
                { username: { $regex: req.query.search, $options: 'i' } },
                { name: { $regex: req.query.search, $options: 'i' } },
            ] }).skip(pD.startFrom).limit(pD.perPage);

        // General Listing
        } else {
            totalDocs = await Employee.countDocuments();
            pD = await pagination(req, totalDocs);
            employees = await Employee.find().skip(pD.startFrom).limit(pD.perPage);
        }

        res.render('backoffice/admin/employee/manageEmployees', 
        { employees: employees, totalPages: pD.totalPages, currentPage: pD.pageNumber, query: req.query.search });

    } catch (error) {
        res.render("error/error", { message: "Error searching employee", error: error });
    }
}; // Get the employee list

exports.backoffice_admin_employee_create_get = function (req, res) {
    res.render('backoffice/admin/employee/createEmployee');
}; // Get the form to create a new employee

exports.backoffice_admin_employee_create_post = function (req, res) {
    // Using promises to search for username and/or email already in use
    var usernamePromise = Employee.findOne({ username: req.body.username });
    var emailPromise = Employee.findOne({ email: req.body.email });

    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
        // If the username or email already exists, redirect to the create page, with an error message
        if (promisesToDo[0]) {
            return res.render('backoffice/admin/employee/createEmployee', 
            { oldata: req.body, message: "Username already exists" });
        } else if (promisesToDo[1]) {
            return res.render('backoffice/admin/employee/createEmployee', 
            { oldata: req.body, message: "Email already exists" });
        } else {
        // If the username and email are unique, create the employee
            var employee = new Employee({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                email: req.body.email,
                category: req.body.category,
                address: req.body.address,
                admin: false,
            });

            employee.setPassword(req.body.password);

            employee.save(function (err) {
                if (err) {
                    res.render('error/error', { message: "Error creating employee", error: err });
                } else {
                    // Milestone2 - add message of success
                    res.redirect('/backoffice/admin/employee');
                }
            });
        }
    });
}; // Creating process for a new employee


exports.backoffice_admin_employee_update_get = async function (req, res) {
    try {
        var employee = await Employee.findById(req.params.id);
        res.render('backoffice/admin/employee/updateEmployee', { employee: employee });
        // Milestone2 - add message of success
    } catch (error) {
        res.render("error/error", { message: "Error updating employee", error: error });
    }
}; // Form to update an employee

exports.backoffice_admin_employee_update_post = function (req, res) {
    Employee.findOneAndUpdate({ username: req.body.username }, req.body, { new: true }, 
        function (err, employee) {
        if (err) {
            res.render('error/error', { message: "Error updating employee", error: err });
        } else {
            // Milestone2 - add message of success
            res.redirect('/backoffice/admin/employee');
        }
    });
}; // Update an employee
    

exports.backoffice_admin_employee_delete_post = function (req, res) {   
    Employee.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting employee", error: err });
        } else {
            // Milestone2 - add message of success
            res.redirect('/backoffice/admin/employee'); // Need to add success message
        }
    });
}; // Delete a employee

exports.backoffice_admin_employee_update_password_get = async function (req, res) {
    try {
        var employee = await Employee.findById(req.params.id);
        res.render('backoffice/admin/employee/updatePassword', { employee: employee });
    } catch (error) {
        res.render("error/error", { message: "Error updating employee", error: error });
    }
}; // Form to update an employee's password

exports.backoffice_admin_employee_update_password_post = async function (req, res) {
    // Update the employee's password
    var salt = crypto.randomBytes(16).toString('hex'); 
    
    // Hashing user's salt and password with 1000 iterations, 
    var newPasswordHash = crypto.pbkdf2Sync(req.body.password, salt,  
    1000, 64, process.env.ENCRYPTION).toString('hex');
    
    Employee.findOneAndUpdate({ username: req.body.username }, 
        { salt: salt, passwordHash: newPasswordHash }, { new: true },
        function (err, employee) {
        if (err) {
            res.render('error/error', { message: "Error updating employee", error: err });
        } else {
            // Milestone2 - add message of success
            res.redirect('/backoffice/admin/employee');
        }
    });
}; // Update an employee's password

//#endregion


// --------------------- Backoffice/Admin/Client ---------------------------
//#region Client

exports.backoffice_admin_client_get = async function (req, res) {
    async function pagination(req) {
        var perPage = 5;
        var totalDocs = await Client.countDocuments();
        var totalPages = Math.ceil(totalDocs / perPage);
        
        var pageNumber = (req.query.page == null) ? 1 : req.query.page;
        var startFrom = (pageNumber - 1) * perPage;
        
        // convert pageNumber to integer
        pageNumber = parseInt(pageNumber);
        return { perPage: perPage, totalPages: totalPages, pageNumber: pageNumber, startFrom: startFrom };
    }

    async function paginationQuery(req) {
        var perPage = 5;
        var totalDocs = await Client.find({ $or:[
            { username: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
        ] }).countDocuments();
        var totalPages = Math.ceil(totalDocs / perPage);
        
        var pageNumber = (req.query.page == null) ? 1 : req.query.page;
        var startFrom = (pageNumber - 1) * perPage;

        // convert pageNumber to integer
        pageNumber = parseInt(pageNumber);
        return { perPage: perPage, totalPages: totalPages, pageNumber: pageNumber, startFrom: startFrom };
    }

    var pD, clients;
    try {
        if (req.query.search) {
            pD = await paginationQuery(req);
            clients = await Client.find({ $or:[
                { username: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } },
            ] }).skip(pD.startFrom).limit(pD.perPage);
        } else {
            pD = await pagination(req);
            clients = await Client.find().skip(pD.startFrom).limit(pD.perPage);
        }
        
        res.render('backoffice/admin/client/manageClients', 
        { clients: clients, totalPages: pD.totalPages, currentPage: pD.pageNumber, query: req.query.search });
        // Milestone2 - add message of success
    } catch (error) {
        res.render("error", { message: "Error finding clients", error: error });
    }
}; // List/show the clients


exports.backoffice_admin_client_create_get = function (req, res) {
    res.render('backoffice/admin/client/createClient');
}; // Get the form to create a new client

exports.backoffice_admin_client_create_post = function (req, res) {
    function calculatePoints(points) {
        var totalPoints = 0;
        if (points == "" || points == null) {
            return 10;
        } else {
            // Milestone2 - logica de negocio
            return points;
        }
    }

    // Using promises to search for username and email already in use
    var usernamePromise = Client.findOne({ username: req.body.username });
    var emailPromise = Client.findOne({ email: req.body.email });
    
    Promise.all([usernamePromise, emailPromise]).then(function (promisesToDo) {
    // If the username or email already exists, redirect to the create page, with an error message
        if (promisesToDo[0]) {
            res.render('backoffice/admin/client/createClient', 
            { oldata: req.body, message: "Username already exists" });
        } else if (promisesToDo[1]) {
            res.render('backoffice/admin/client/createClient', 
            { oldata: req.body, message: "Email already exists" });
        } else {
        // If the username and email are not already in use, create the client
        var client = new Client({
            username: req.body.username,
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            points: calculatePoints(req.body.points), // Milestone2
            birthDate: req.body.birthDate,
            dateString: req.body.birthDate,
        });

        client.setPassword(req.body.password);
        client.setAgeType(req.body.birthDate); // Calculate the ageType field

        client.save(function (err) {
            if (err) {
                res.render('error/error', { message: "Error creating client", error: err });
            } else {
                // Milestone2 - add message of success
                res.redirect('/backoffice/admin/client');
            }
        });
        }
    });
}; // Creating process for a new client


exports.backoffice_admin_client_update_get = async function (req, res) {   
    try {
        var client = await Client.findById(req.params.id);
        
        res.render('backoffice/admin/client/updateClient', { client: client });
        // Milestone2 - add message of success
    } catch (error) {
        res.render("error/error", { message: "Error updating client", error: error });
    }
}; // Get the form to update a client

exports.backoffice_admin_client_update_post = async function (req, res) {
    async function calculateAgeType(birthDate) {
        var age = new Date().getFullYear() - birthDate.substring(0, 4);
        var ageType = "";
        if (age < 10) {
            ageType = "Infantil";
        } else if (age > 10 && age <= 18) {
            ageType = "Juvenil";
        } else if (age > 18 && age <= 60) {
            ageType = "Adulto";
        } else {
            ageType = "Senior";
        }
        return ageType;
    }
    
    req.body.ageType = await calculateAgeType(req.body.birthDate);
    // Update the client
    Client.findOneAndUpdate({ username: req.body.username }, req.body, { new: true }, 
        function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error updating client", error: err });
        } else {
            // Milestone2 - add message of success
            res.redirect('/backoffice/admin/client');
        }
    });
}; // Update a client


exports.backoffice_admin_client_delete_post = function (req, res) {
    Client.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error', { message: "Error deleting employee", error: err });
        } else {
            // Milestone2 - add message of success
            res.redirect('/backoffice/admin/client');
        }
    });
}; // Delete a client

exports.backoffice_admin_client_update_password_get = async function (req, res) {
    try {
        var client = await Client.findById(req.params.id);
        res.render('backoffice/admin/client/updatePassword', { client: client });
    } catch (error) {
        res.render("error/error", { message: "Error updating client", error: error });
    }
}; // Get the form to update a client password


exports.backoffice_admin_client_update_password_post = async function (req, res) {
    // Update the client
    var salt = crypto.randomBytes(16).toString('hex'); 

    // Hashing user's salt and password with 1000 iterations, 
    var newPasswordHash = crypto.pbkdf2Sync(req.body.password, salt,  
    1000, 64, process.env.ENCRYPTION).toString('hex');

    Client.findOneAndUpdate({ username: req.body.username }, 
        { salt: salt, passwordHash: newPasswordHash }, { new: true },
        function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error updating client", error: err });
        } else {
            // Milestone2 - add message of success
            res.redirect('/backoffice/admin/client');
        }
    });
}; // Update a client password

//#endregion


// --------------------- Backoffice/Admin/Book ---------------------------
//#region Book

exports.backoffice_admin_book_get = async function (req, res) {
    async function pagination(req, totalDocs) {
        var perPage = 5;
        var totalPages = Math.ceil(totalDocs / perPage);
        
        var pageNumber = (req.query.page == null) ? 1 : req.query.page;
        var startFrom = (pageNumber - 1) * perPage;
        
        // convert pageNumber to integer
        pageNumber = parseInt(pageNumber);
        return { perPage: perPage, totalPages: totalPages, pageNumber: pageNumber, startFrom: startFrom };
    }

    var pD, totalDocs, books;
    try {
        if (req.query.search) {
            // ISBN Search
            if (RegExp(/^[0-9]+$/).test(req.query.search)) {
                totalDocs = await Book.countDocuments().where('isbn').equals(req.query.search);
                pD = await pagination(req, totalDocs);
                
                books = await Book.find({ isbn: req.query.search })
                .skip(pD.startFrom).limit(pD.perPage).sort({ dateAdded: 1 });
            
            // Title, Author, Editor Search
            } else {
                totalDocs = await Book.find({ $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { author: { $regex: req.query.search, $options: 'i' } },
                    { editor: { $regex: req.query.search, $options: 'i' } }
                ] }).countDocuments();
                pD = await pagination(req, totalDocs);

                books = await Book.find({ $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { author: { $regex: req.query.search, $options: 'i' } },
                    { editor: { $regex: req.query.search, $options: 'i' } }
                ] })
                .skip(pD.startFrom).limit(pD.perPage).sort({ dateAdded: 1 });
            }

        // General listing
        } else {
            totalDocs = await Book.countDocuments();
            pD = await pagination(req, totalDocs);
            books = await Book.find().skip(pD.startFrom).limit(pD.perPage).sort({ dateAdded: 1 });
        }
        
        res.render('backoffice/admin/book/manageBooks', 
        { books: books, totalPages: pD.totalPages, currentPage: pD.pageNumber, query: req.query.search });
        // Milestone2 - add message of success
    } catch (error) {
        res.render("error/error", { message: "Error listing books", error: error });
    }
}; // List/show the books

exports.backoffice_admin_book_create_get = function (req, res) {
    res.render('backoffice/admin/book/createBook');
}; // Get the form to create a new book


exports.backoffice_admin_book_create_post = function (req, res) {
    var isbnPromise = Book.findOne({ isbn: req.body.isbn });
    
    // Use promises to search for ISBN already in use
    Promise.all([isbnPromise]).then(function (promisesToDo) {
        // If the isbn already exists
        if (promisesToDo[0]) {
            oldata = req.body;
            res.render('backoffice/admin/book/createBook', 
            { oldata: oldata, message: "ISBN already exists" });
        } else {
            // If the isbn is not already in use, create the book
            var book = new Book({
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                editor: req.body.editor,
                resume: req.body.resume,
                isbn: req.body.isbn,
                dateString: getDateNow(),
                stock: 1,
                condition: req.body.condition,
                provider: req.body.provider,
                sellPrice: req.body.sellPrice,
                buyPrice: req.body.buyPrice,
            });

        book.save(function (err) {
            if (err) {
                res.render('error/error', { message: "Error creating book", error: err });
            } else {
                // find or create the author
                Author.findOne({ name: req.body.author }, function (err, author) {
                    if (err) {
                        res.render('error/error', { message: "Error creating book", error: err });
                    } else {
                        if (!author) {
                            var author = new Author({
                                name: req.body.author,
                                books: [book]
                            });

                            author.save(function (err) {
                                if (err) {
                                    res.render('error/error', 
                                    { message: "Error creating author", error: err });
                                }
                            });
                        } else {
                            // Add the book to the array of books of the author
                            author.books.push(book);
                            author.save(function (err) {
                                if (err) {
                                    res.render('error/error', 
                                    { message: "Error creating author", error: err });
                                }
                            });
                        }
                    }
                }); // Author end

                // find or create the editor
                Editor.findOne({ name: req.body.editor }, function (err, editor) {
                    if (err) {
                        res.render('error/error', { message: "Error creating book", error: err });
                    } else {
                        if (!editor) {
                            var editor = new Editor({
                                name: req.body.editor,
                                books: [book]
                            });

                            editor.save(function (err) {
                                if (err) {
                                    res.render('error/error', 
                                    { message: "Error creating editor", error: err });
                                }
                            });
                        } else {
                            // Add the book to the array of books of the editor
                            editor.books.push(book);
                            editor.save(function (err) {
                                if (err) {
                                    res.render('error/error', 
                                    { message: "Error creating editor", error: err });
                                }
                            });
                        }
                    }
                }); // Editor end

                // save the cover
                if (req.file) {
                    fs.writeFileSync("./public/images/books/" + book._id + ".jpg", req.file.buffer);
                }
            }
        }); // Book save end
        res.redirect('/backoffice/admin/book');
    }
    }); // Promise end
}; // Create a new book


exports.backoffice_admin_book_update_get = async function (req, res) {
    try {
        var book = await Book.findById(req.params.id);
        res.render('backoffice/admin/book/updateBook', { book: book });
    } catch (error) {
        res.render("error/error", { message: "Error updating book", error: error });
    }
}; // Get the form to update a book

exports.backoffice_admin_book_update_post = function (req, res) {
    Book.findByIdAndUpdate( { _id: req.params.id }, req.body, { new: true }, 
        function (err, book) {
        if (err) {
            res.render('error/error', { message: "Error updating book", error: err });
        } else {
            res.redirect('/backoffice/admin/book');
        }
    });
}; // Update a book


exports.backoffice_admin_book_delete_post = function (req, res) {
    Book.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error/error', { message: "Error deleting book", error: err });
        } else {
            // Milestone2 - add message of success
            res.redirect('/backoffice/admin/book');
        }
    });
}; // Delete a book

//#endregion


// --------------------- Backoffice/Admin/Sale ---------------------------
//#region Sale

exports.backoffice_admin_sales_get = async function (req, res) {
    async function getTitleBooks (req, res, sales) {
        for (var i = 0; i < sales.length; i++) {
            for (var j = 0; j < sales[i].books.length; j++) {
                var book = await Book.findById(sales[i].books[j]._id);
                sales[i].books[j].title = book.title;
            }
        }
        return sales;
    }

    async function getEmployeeUsername (req, res, sales) {
        for (var i = 0; i < sales.length; i++) {
            var employee = await Employee.findById(sales[i].employee_id);
            sales[i].employeeUsername = employee.username;
        }
        return sales;
    }

    async function pagination(req, totalDocs) {
        var perPage = 5;
        var totalPages = Math.ceil(totalDocs / perPage);
        
        var pageNumber = (req.query.page == null) ? 1 : req.query.page;
        var startFrom = (pageNumber - 1) * perPage;
        
        // convert pageNumber to integer
        pageNumber = parseInt(pageNumber);
        return { perPage: perPage, totalPages: totalPages, pageNumber: pageNumber, startFrom: startFrom };
    }

    // 
    //pD=pagination data

    var pD, totalDocs, sales;
    try {
        if (req.query.search) {
            // if true or false, we are checking for online field
            if (req.query.search == "true" || req.query.search == "false") {
                totalDocs = await Sale.countDocuments({ online: req.query.search });
                pD = await pagination(req, totalDocs);

                sales = await Sale.find({ online: req.query.search }).skip(pD.startFrom).limit(pD.perPage);
            
            // if not true or false, we are checking for clientUsername field
            } else {
                totalDocs = await Sale.countDocuments({ clientUsername: req.query.search });
                pD = await pagination(req, totalDocs);

                sales = await Sale.find({ clientUsername: req.query.search }).skip(pD.startFrom).limit(pD.perPage);
            }

            // get the title of the books
            await getTitleBooks(req, res, sales);
            await getEmployeeUsername(req, res, sales);

            res.render('backoffice/admin/sales/manageSales',
            { sales: sales, totalPages: pD.totalPages, currentPage: pD.pageNumber, query: req.query.search });
        
        // General Listing
        } else {
            totalDocs = await Sale.countDocuments();
            pD = await pagination(req, totalDocs);

            sales = await Sale.find().skip(pD.startFrom).limit(pD.perPage);
            await getTitleBooks(req, res, sales);
            await getEmployeeUsername(req, res, sales);

            res.render('backoffice/admin/sales/manageSales',
            { sales: sales, totalPages: pD.totalPages, currentPage: pD.pageNumber, query: req.query.search });
        }

    } catch (error) {
        res.render("error/error", { message: "Error searching sale", error: error });
    }
}; // Get the list of sales

exports.backoffice_admin_make_sale_get = async function (req, res) {  
    try {
        var books = await Book.find();

        res.render('backoffice/admin/sales/makeSale', { books: books });
    } catch (error) {
        res.render("error/error", { message: "Error finding sales", error: error });
    }
}; // Get the form to make a sale

exports.backoffice_admin_make_sale_post = async function (req, res) {
    function calculateTotal() {
        return 0;
    } // Milestone 2
    
    function calculateShipping() {
        return 0;
    } // Milestone 2
    
    // A implementar: Based on the username verify if the client exists and get the clientId, ageType and points
    var books = await Book.find();
    Client.findOne({ username: req.body.clientUsername }, function (err, client) {
        if (err) {
            res.render('error/error', { message: "Error finding user", error: err });
        } else {
            if (!client) {
                res.render('backoffice/admin/sales/manageSales', 
                { message: "User not found", sales: [] });
            } else {
                // make the sale
                var sale = new Sale({
                    clientUsername: req.body.clientUsername,
                    books: req.body.bookId,
                    dateString: getDateNow(),
                    total: calculateTotal(),
                    online: req.body.online,
                    employee_id: req.session.employeeID,
                    shipping: calculateShipping()
                });

                sale.save(function (err) {
                    if (err) {
                        res.render('error/error', { message: "Error creating sale", error: err });
                    } else {
                        // MileStone 2 - add success message
                        res.redirect('/backoffice/admin/sales');
                    }
                });
            }
        }
    });
}; // Make a sale

//#endregion


// --------------------- Backoffice/Admin/Manage Points ---------------------------
//#region Points

exports.backoffice_admin_managepoints_get = async function (req, res) {
    try {
        var points = await Points.findById(pointsIDcollection);
        res.render('backoffice/admin/managePoints/managePoints', { points: points });
    } catch (error) {
        res.render("error/error", { message: "Error getting points", error: error });
    }
}; // Get the form to update the points

exports.backoffice_admin_managepoints_post = function (req, res) {
    Points.findByIdAndUpdate(pointsIDcollection, req.body, { new: true },
        function (err, points) {
        if (err) {
            res.render('error/error', { message: "Error managing points", error: err });
        } else {
            res.redirect('/backoffice/admin');
        }
    });
}; // Update the points table

//#endregion


// --------------------- Backoffice/Admin/Manage Discount ---------------------------
//#region Discount

exports.backoffice_admin_managediscount_get = async function (req, res) {
    try {
        var discount = await Discount.findById(discountIDcollection);
        res.render('backoffice/admin/manageDiscount/manageDiscount', { discount: discount });
    } catch (error) {
        res.render("error/error", { message: "Error getting discount", error: error });
    }
}; // Get the form to update the discount

exports.backoffice_admin_managediscount_post = function (req, res) {
    Discount.findByIdAndUpdate(discountIDcollection, req.body, { new: true },
        function (err, discount) {
        if (err) {
            res.render('error/error', { message: "Error managing points", error: err });
        } else {
            res.redirect('/backoffice/admin');
        }
    });
}; // Update the discount table

//#endregion

// --------------------- Backoffice/Admin/proposals ---------------------------

exports.backoffice_admin_proposals_get = async function (req, res) {
    async function pagination(req, totalDocs) {
        var perPage = 5;
        var totalPages = Math.ceil(totalDocs / perPage);
        
        var pageNumber = (req.query.page == null) ? 1 : req.query.page;
        var startFrom = (pageNumber - 1) * perPage;
        
        // convert pageNumber to integer
        pageNumber = parseInt(pageNumber);
        return { perPage: perPage, totalPages: totalPages, pageNumber: pageNumber, startFrom: startFrom };
    }

    var pD, totalDocs, books;
    try {
        if (req.query.search) {
            // ISBN Search
            if (RegExp(/^[0-9]+$/).test(req.query.search)) {
                totalDocs = await TempBook.countDocuments().where('isbn').equals(req.query.search);
                pD = await pagination(req, totalDocs);
                
                books = await TempBook.find({ isbn: req.query.search })
                .skip(pD.startFrom).limit(pD.perPage).sort({ dateAdded: 1 });
            
            // Title, Author, Editor Search
            } else {
                totalDocs = await TempBook.find({ $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { author: { $regex: req.query.search, $options: 'i' } },
                    { editor: { $regex: req.query.search, $options: 'i' } }
                ] }).countDocuments();
                pD = await pagination(req, totalDocs);

                books = await TempBook.find({ $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { author: { $regex: req.query.search, $options: 'i' } },
                    { editor: { $regex: req.query.search, $options: 'i' } }
                ] })
                .skip(pD.startFrom).limit(pD.perPage).sort({ dateAdded: 1 });
            }

        // General listing
        } else {
            totalDocs = await TempBook.countDocuments();
            pD = await pagination(req, totalDocs);
            books = await TempBook.find().skip(pD.startFrom).limit(pD.perPage).sort({ dateAdded: 1 });
        }
        
        res.render('backoffice/admin/proposels/indexProposels', 
        { books: books, totalPages: pD.totalPages, currentPage: pD.pageNumber, query: req.query.search });
        // Milestone2 - add message of success
    } catch (error) {
        res.render("error/error", { message: "Error listing books", error: error });
    }
}; // List/show the books


// --------------------- Backoffice/Admin/UsedBooks ---------------------------

exports.backoffice_admin_usedbook_get = async function (req, res) {
    async function pagination(req, totalDocs) {
        var perPage = 5;
        var totalPages = Math.ceil(totalDocs / perPage);
        
        var pageNumber = (req.query.page == null) ? 1 : req.query.page;
        var startFrom = (pageNumber - 1) * perPage;
        
        // convert pageNumber to integer
        pageNumber = parseInt(pageNumber);
        return { perPage: perPage, totalPages: totalPages, pageNumber: pageNumber, startFrom: startFrom };
    }

    var pD, totalDocs, books;
    try {
        if (req.query.search) {
            // ISBN Search
            if (RegExp(/^[0-9]+$/).test(req.query.search)) {
                totalDocs = await UsedBook.countDocuments().where('isbn').equals(req.query.search);
                pD = await pagination(req, totalDocs);
                
                books = await UsedBook.find({ isbn: req.query.search })
                .skip(pD.startFrom).limit(pD.perPage).sort({ dateAdded: 1 });
            
            // Title, Author, Editor Search
            } else {
                totalDocs = await UsedBook.find({ $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { author: { $regex: req.query.search, $options: 'i' } },
                    { editor: { $regex: req.query.search, $options: 'i' } }
                ] }).countDocuments();
                pD = await pagination(req, totalDocs);

                books = await UsedBook.find({ $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { author: { $regex: req.query.search, $options: 'i' } },
                    { editor: { $regex: req.query.search, $options: 'i' } }
                ] })
                .skip(pD.startFrom).limit(pD.perPage).sort({ dateAdded: 1 });
            }

        // General listing
        } else {
            totalDocs = await UsedBook.countDocuments();
            pD = await pagination(req, totalDocs);
            books = await UsedBook.find().skip(pD.startFrom).limit(pD.perPage).sort({ dateAdded: 1 });
        }
        
        res.render('backoffice/admin/usedbook/manageUsedBooks', 
        { books: books, totalPages: pD.totalPages, currentPage: pD.pageNumber, query: req.query.search });
        // Milestone2 - add message of success
    } catch (error) {
        res.render("error/error", { message: "Error listing books", error: error });
    }
}; // List/show the books

// --------------------- Backoffice/Admin/UsedBooks/Create ---------------------------


exports.backoffice_admin_usedbook_create_get = async function (req, res) {
    try {
        var book = await TempBook.findById(req.params.id);
       
        book.buyPrice = book.sellPrice;
        console.log(book);
        res.render('backoffice/admin/usedbook/createUsedBook', { book: book });
    } catch (error) {
        res.render("error/error", { message: "Error updating book", error: error });
    }
}; // Get the form to create a new book


exports.backoffice_admin_usedbook_create_post = function (req, res) {
    var isbnPromise = UsedBook.findOne({ isbn: req.body.isbn });
    
    // Use promises to search for ISBN already in use
    Promise.all([isbnPromise]).then(function (promisesToDo) {
        // If the isbn already exists
        if (promisesToDo[0]) {
            oldata = req.body;
            books = [];
            console.log(oldata,"erro de isbn");
            res.render('backoffice/admin/proposels/indexProposels',
            { books: books, message: "We already have this book in our used book stock." });
        } else {
            // If the isbn is not already in use, create the book
            var book = new UsedBook({
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                editor: req.body.editor,
                resume: req.body.resume,
                isbn: req.body.isbn,
                dateString: getDateNow(),
                stock: 1,
                condition: req.body.condition,
                provider: req.body.provider,
                sellPrice: req.body.sellPrice,
                buyPrice: req.body.buyPrice,
            });

        book.save(function (err) {
            if (err) {
                res.render('error/error', { message: "Error creating book", error: err });
            } else {
                // find or create the author
                Author.findOne({ name: req.body.author }, function (err, author) {
                    if (err) {
                        res.render('error/error', { message: "Error creating book", error: err });
                    } else {
                        if (!author) {
                            var author = new Author({
                                name: req.body.author,
                                books: [book]
                            });

                            author.save(function (err) {
                                if (err) {
                                    res.render('error/error', 
                                    { message: "Error creating author", error: err });
                                }
                            });
                        } else {
                            // Add the book to the array of books of the author
                            author.books.push(book);
                            author.save(function (err) {
                                if (err) {
                                    res.render('error/error', 
                                    { message: "Error creating author", error: err });
                                }
                            });
                        }
                    }
                }); // Author end

                // find or create the editor
                Editor.findOne({ name: req.body.editor }, function (err, editor) {
                    if (err) {
                        res.render('error/error', { message: "Error creating book", error: err });
                    } else {
                        if (!editor) {
                            var editor = new Editor({
                                name: req.body.editor,
                                books: [book]
                            });

                            editor.save(function (err) {
                                if (err) {
                                    res.render('error/error', 
                                    { message: "Error creating editor", error: err });
                                }
                            });
                        } else {
                            // Add the book to the array of books of the editor
                            editor.books.push(book);
                            editor.save(function (err) {
                                if (err) {
                                    res.render('error/error', 
                                    { message: "Error creating editor", error: err });
                                }
                            });
                        }
                    }
                }); // Editor end               
                
                // Get the id from the url
                // url : /usedbook/create/628e60c40d10ec91221ddf02
                var tempID = req.url;
                tempID = tempID.split("/");
                tempID = tempID[tempID.length - 1];

                // Rename the file of this id to the new id
                fs.rename('./public/images/books/' + tempID + '.jpg', './public/images/books/' + book._id + '.jpg', function (err) {
                    if (err) { console.log(err); }
                });
            }
        }); // UsedBook save end
        res.redirect('/backoffice/admin/usedbook');
    }
    }); // Promise end
}; // Create a new Usedbook



exports.backoffice_admin_usedbook_update_get = async function (req, res) {
    try {
        var book = await UsedBook.findById(req.params.id);
        res.render('backoffice/admin/usedbook/updateUsedBook', { book: book });
    } catch (error) {
        res.render("error/error", { message: "Error updating book", error: error });
    }
}; // Get the form to update a Usedbook

exports.backoffice_admin_usedbook_update_post = function (req, res) {
    UsedBook.findByIdAndUpdate( { _id: req.params.id }, req.body, { new: true }, 
        function (err, book) {
        if (err) {
            res.render('error/error', { message: "Error updating book", error: err });
        } else {
            res.redirect('/backoffice/admin/usedbook');
        }
    });
}; // Update a book


exports.backoffice_admin_usedbook_delete_post = function (req, res) {
    UsedBook.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.render('error/error', { message: "Error deleting book", error: err });
        } else {
            // Milestone2 - add message of success
            res.redirect('/backoffice/admin/usedbook');
        }
    });
}; // Delete a book




