const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

// Definición del schema
// https://mongoosejs.com/docs/guide.html#models
// Tipos de schemas en Mongoose
// https://mongoosejs.com/docs/schematypes.html
const posicionSchema = new mongoose.Schema({
  torneo: {
    type: String,
    trim: true
  },
  categoria: {
    type: String,
    trim: true
  },
  equipo: {
    type: String,
    trim: true
  },
  PJ: {
    type: Number,
    trim: true,
    default:0
  },PG: {
    type: Number,
    trim: true,
    default:0
  },PE: {
    type: Number,
    trim: true,
    default:0
  },PP: {
    type: Number,
    trim: true,
    default:0
  },G: {
    type: Number,
    trim: true,
    default:0
  },
  DG: {
    type: Number,
    trim: true,
    default:0
  },
  url: {
    type: String,
    lowercase: true
  },
  puntos: {
    type: Number,
    trim: true,
    default:0
  }
});
// Hooks para generar la URL (en Mongoose se conoce como middleware)
posicionSchema.pre("save", function(next) {
  // Crear la URL
  const url = slug(this.torneo);
  this.url = `${url}-${shortid.generate()}`;

  next();
});

module.exports = mongoose.model("posicion", posicionSchema);