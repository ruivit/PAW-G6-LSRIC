var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    category: { type: String, required: true },
    address: { type: String, required: true },
    admin: { type: Boolean, required: false, default: false },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: false },
}, { collection: 'Employees' });

// Method to set salt and hash the password for a user 
EmployeeSchema.methods.setPassword = function(password) { 
     
    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex'); 
    
    // Hashing user's salt and password with 1000 iterations, 
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, process.env.ENCRYPTION).toString('hex'); 
}; 
    
// Method to check the entered password is correct or not 
EmployeeSchema.methods.checkPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, process.env.ENCRYPTION).toString('hex'); 
    return this.passwordHash === hash; 
}; 

// Export model.
module.exports = mongoose.model('Employee', EmployeeSchema);
