const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

// Definición del schema
// https://mongoosejs.com/docs/guide.html#models
// Tipos de schemas en Mongoose
// https://mongoosejs.com/docs/schematypes.html
const jugadorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: "El nombre del jugador es requerido",
    trim: true
  },
  numeroCuenta: {
    type: Number,
    required: "El numero de cuenta es requerido",
    trim: true
  },
  permiso: {
    type: Number,
    default:1
  },
  urlEquipo:{
    type:String,
    trim:true
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
jugadorSchema.pre("save", function(next) {
  // Crear la URL
  const url = slug(this.numeroCuenta);
  this.url = `${url}-${shortid.generate()}`;

  next();
});

module.exports = mongoose.model("jugador", jugadorSchema);