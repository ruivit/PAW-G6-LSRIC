var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DiscountSchema = new Schema({
  discountPerSale: { type: Number, required: true, default: 0.05 },
  // Desconto por venda (tipo cliente FNAC)

  discountPromotion: { type: Number, required: true, default: 0.1 },

  activePromotion: { type: Boolean, required: true, default: false },

  perInfantil: { type: Number, required: true, default: 0 },
  perJuvenil: { type: Number, required: true, default: 0 },
  perAdulto: { type: Number, required: true, default: 0 },
  perSenior: { type: Number, required: true, default: 0 },

}, { collection: 'Discount' });

// Export model.
module.exports = mongoose.model('Discount', DiscountSchema);
