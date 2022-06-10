var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SaleSchema = new Schema({
  clientUsername: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  booksTitle: [{ type: String, required: false }],
  quantity: [{ type: Number, required: true }],
  total: { type: Number, default: 0 },
  gainedPoints: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  dateString: { type: String, default: '' },
  online: { type: Boolean, default: false },
  employee_id: { type: Schema.Types.ObjectId, ref: 'Employee', required: false },
  shipping: { type: Number, default: 0 }
}, { collection: 'Sales' });

// Export model.
module.exports = mongoose.model('Sale', SaleSchema);
