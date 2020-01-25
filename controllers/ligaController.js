const mongoose = require("mongoose");
//const Liga = mongoose.model("presupuesto");
//const Liga = require('../models/modeloPosicion');
//const Gastos = require("../models/modeloGastos");
//const Vacante = mongoose.model("Vacante");
//const { isAuthenticated } = require('../helpers/auth');
const Usuario = require('../models/modeloUsuario');

exports.homeLiga = async (req, res, next) => {
  res.render("inicio", {
    nombrePagina: " Liga UNICAH JS",
    tagline: "La liga del campus Jesús Sacramentado"
  });
};