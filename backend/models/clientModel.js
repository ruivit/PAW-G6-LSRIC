var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  address: { type: String, required: true },
  phone: { type: Number, required: false },
  points: { type: Number, required: false, default: 10 },
  birthDate: { type: Date, required: true },
  dateString: { type: String, required: true },
  ageType: { type: String, required: true },

  totalBuys: { type: Number, required: false, default: 0 },
  // Quando se compra um livro, +1

  soldBooks: { type: Number, required: false, default: 0 },
  // Quantidade de livros vendidos pelo cliente
  totalSold: { type: Number, required: false, default: 0 },
  // Total de dinheiro gasto pelo cliente

  passwordHash: { type: String, required: true },
  salt: { type: String, required: false },
}, { collection: 'Clients' });

// Method to set salt and hash the password for a user 
ClientSchema.methods.setPassword = function(password) { 
     
  // Creating a unique salt for a particular user 
  this.salt = crypto.randomBytes(16).toString('hex'); 
  
  // Hashing user's salt and password with 1000 iterations, 
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt,  
  1000, 64, process.env.ENCRYPTION).toString('hex'); 
}; 
  
// Method to check the entered password is correct or not 
ClientSchema.methods.checkPassword = function(password) { 
  var hash = crypto.pbkdf2Sync(password,  
  this.salt, 1000, 64, process.env.ENCRYPTION).toString('hex'); 
  return this.passwordHash === hash; 
}; 



ClientSchema.methods.setAgeType = function(birthDate) {
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
  return this.ageType = ageType;
};


// Export model.
module.exports = mongoose.model('Client', ClientSchema);
