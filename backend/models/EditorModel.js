var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EditorSchema = new Schema({
  name: { type: String, required: true, unique: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, { collection: 'Editors' });

// Export model.
module.exports = mongoose.model('Editor', EditorSchema);
