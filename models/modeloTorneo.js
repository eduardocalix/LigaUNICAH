const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

// Definición del schema
// https://mongoosejs.com/docs/guide.html#models
// Tipos de schemas en Mongoose
// https://mongoosejs.com/docs/schematypes.html
const torneoSchema = new mongoose.Schema({
  nombreTorneo: {
    type: String,
    trim: true
  },
  periodo: {
    type: String,
    trim: true
  },
  año: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("torneo", torneoSchema);