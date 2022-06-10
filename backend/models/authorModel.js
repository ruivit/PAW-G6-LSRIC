var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  name: { type: String, required: true, unique: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, { collection: 'Authors' });

// Export model.
module.exports = mongoose.model('Author', AuthorSchema);
