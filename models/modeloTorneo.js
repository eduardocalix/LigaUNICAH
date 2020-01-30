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
  year: {
    type: String,
    trim: true
  },
  usuario: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    lowercase: true
  }
});
// Hooks para generar la URL (en Mongoose se conoce como middleware)
torneoSchema.pre("save", function(next) {
  // Crear la URL
  const url = slug(this.nombreTorneo);
  this.url = `${url}-${shortid.generate()}`;

  next();
});
module.exports = mongoose.model("torneo", torneoSchema);