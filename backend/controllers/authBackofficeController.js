var jwt = require('jsonwebtoken');

// ----------------------- Models ------------------------------
var Employee = require('../models/employeeModel');
var Client = require('../models/clientModel');

// -------------------- Backoffice/ ---------------------------

// Login Portal
exports.backoffice_login_get = function (req, res) {
    res.render('backoffice/backofficeLogin');
};

// Login Process
exports.backoffice_login_post = function (req, res) {
    // Search the username and password (hash) in the database
    // if the admin field is true go to admin dashboard
    // if the admin field is false go to employee dashboard
    var token;
    Employee.findOne({ username: req.body.username }, function (err, employee) {
        if (err) {
            res.redirect('error/error', { error: err });
        } else {
            if (employee) {
                if (employee.checkPassword(req.body.password)) {
                    if (employee.admin) {
                        req.session.admin = true;
                        req.session.username = employee.username;
                        req.session.employeeID = employee._id;
                        token = jwt.sign(
                            { employeeID: employee._id }, 
                            process.env.SECRET_KEY, 
                            { expiresIn: '1h' }, (err, token));

                        res.cookie('token', token, {
                            maxAge: 3600000,
                            samesite: 'Strict',
                            secure: true,
                            httpOnly: true,
                        });
                        res.redirect('/backoffice/admin');
                        
                    } else {
                        req.session.admin = false;
                        req.session.employee = true;
                        req.session.username = employee.username;
                        req.session.employeeID = employee._id;  
                        token = jwt.sign(
                            { employeeID: employee._id }, 
                            process.env.SECRET_KEY, 
                            { expiresIn: '1h' }, (err, token));

                        res.cookie('token', token, {
                            maxAge: 3600000,
                            samesite: 'Strict',
                            secure: true,
                            httpOnly: true,
                        });
                        res.redirect('/backoffice/employee');
                    }
                    
                // If the username/password is wrong, render the login page again with a message
                } else {
                    res.render('backoffice/backofficeLogin', 
                    { oldata: req.body, message: 'Invalid password' });
                }
            } else {
                res.render('backoffice/backofficeLogin', 
                { oldata: req.body, message: 'Invalid Username' });
            }
        }
    });
};

// Logout Process (destroy the session) clear the cookies and redirect to the login page
exports.backoffice_logout = function (req, res) {
    req.session.destroy();

    res.clearCookie('token');

    res.redirect('/backoffice');
}; 


exports.client_login_post = function (req, res) {
    // Search the username and password (hash) in the database

    console.log(req.body);
    var token;
    Client.findOne({ username: req.body.username }, function (err, client) {
        if (err) {
            res.redirect('error/error', { error: err });
        } else {
            if (client) {
                if (client.checkPassword(req.body.password)) {
                    req.session.client = true;
                    req.session.username = client.username;
                    req.session.clientID = client._id;
                    token = jwt.sign(
                        { clientID: client._id }, 
                        process.env.SECRET_KEY, 
                        { expiresIn: '1h' }, (err, token));

                    res.cookie('token', token, {
                        maxAge: 3600000,
                        samesite: 'Strict',
                        secure: true,
                        httpOnly: true,
                    });
                    res.status(200).send({
                        message: 'Login Successful',
                        token: token,
                        clientID: client._id,
                    });
                } else {
                    res.status(401).send({
                        message: 'Invalid Password',
                    });
                }
            } else {
                res.status(401).send({
                    message: 'Invalid Username',
                });
            }
        }
    });
};

exports.client_logout = function (req, res) {
    req.session.destroy();

    res.clearCookie('token');

    res.status(200).send({
        message: 'Logout Successful',
    });
};
