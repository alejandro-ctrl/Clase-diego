const mongoose = require("mongoose");

const ZapatoSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  talla: { type: Number, required: true },
  color: { type: String, required: true },
  precio: { type: Number, required: true },
  enStock: { type: Boolean, default: true },
});

module.exports = mongoose.model("Zapato", ZapatoSchema);
