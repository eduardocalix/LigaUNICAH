const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

// Definición del schema
// https://mongoosejs.com/docs/guide.html#models
// Tipos de schemas en Mongoose
// https://mongoosejs.com/docs/schematypes.html
const equipoSchema = new mongoose.Schema({
  nombreEquipo: {
    type: String,
    trim: true,
    required: "El ingreso mensual es requerido"
  },
  categoria: {
    type: String,
    trim: true
  },
  torneo: {
    type: String,
    trim: true
  },
  encargado: {
    type: String,
    trim: true
  },
  observacion: {
    type: String,
    trim: true
  }
});
// Hooks para generar la URL (en Mongoose se conoce como middleware)
equipoSchema.pre("save", function(next) {
  // Crear la URL
  const url = slug(this.nombreEquipo);
  this.url = `${url}-${shortid.generate()}`;

  next();
});

module.exports = mongoose.model("equipo", equipoSchema);