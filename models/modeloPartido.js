const partidoSchema = new mongoose.Schema({
    torneo: {
      type: String,
      trim: true
    },
    Lugar: {
      type: String,
      trim: true
    },
    semana: {
      type: String,
      trim: true
    },
    fecha: {
        type: String,
        trim: true
      },
    hora: {
        type: String,
        trim: true
      },
      casa: {
        type: String,
        trim: true
      },
      visitante: {
        type: String,
        trim: true
      },
      golesCasa: {
        type: Number,
        trim: true
      },
      golesVisitante: {
        type: Number,
        trim: true
      },
      resultado: {
        type: Number,
        trim: true
      }
  });
  
  module.exports = mongoose.model("partido", partidoSchema);