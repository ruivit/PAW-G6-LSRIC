var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TempBookSchema = new Schema({
  title: { type: String, required: true },
  author:{ type: String, required: true },
  genre:{ type: String, required: true },
  editor:{ type: String, required: true },
  resume: { type: String, required: true },
  isbn: { type: Number, required: true },
  dateAdded: { type: Date, required: false, default: Date.now },
  dateString: { type: String, required: false, default: '' },
  provider: { type: String, required: true},
  sellPrice: { type: Number, required: true },
}, { collection: 'TempBooks' });

// Export model.
module.exports = mongoose.model('TempBook', TempBookSchema);
