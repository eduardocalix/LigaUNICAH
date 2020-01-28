const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

// Definición del schema
// https://mongoosejs.com/docs/guide.html#models
// Tipos de schemas en Mongoose
// https://mongoosejs.com/docs/schematypes.html
const arbitroSchema = new mongoose.Schema({
  nombreArbitro: {
    type: String,
    required: "El nombre del arbitro es requerido",
    trim: true
  },
  numeroTelefono: {
    type: Number,
    required: "El numero de cuenta es requerido"
  },
  observacion: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    lowercase: true
  }
});
// Hooks para generar la URL (en Mongoose se conoce como middleware)
arbitroSchema.pre("save", function(next) {
  // Crear la URL
  const url = slug(this.nombreArbitro);
  this.url = `${url}-${shortid.generate()}`;

  next();
});

module.exports = mongoose.model("arbitro", arbitroSchema);