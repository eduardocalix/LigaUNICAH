const mongoose = require("mongoose");
const Torneo = require('../models/modeloTorneo');
const Equipo = require('../models/modeloEquipo');
const Categoria = mongoose.model("modeloGastos");
//const Vacante = mongoose.model("Vacante");
//const { isAuthenticated } = require('../helpers/auth');
const Usuario = require('../models/modeloUsuario');

exports.formularioEquipo =  async (req, res, next) => {
 
  res.render("equipos/nuevoEquipo", {
    nombrePagina: "Nuevo equipo",
    tagline: "¡Liga Jesús Sacramentado!"
  });
  req.flash("success", ["Bienvenido"]);
};

  // Agregar un nueva equipo a la base de datos
exports.agregarEquipo = async (req, res) => {
    const usuarioO = req.user;
    //console.log("estos son los datos que trae el equipo");
    //console.log(req.body);
    const torneo = await Torneo.findOne({ url: req.params.url });
    if (!torneo) return next();
        const gasto = new Gasto(req.body);
        //console.log(torneo._id);
        const categoria = await Categoria.findOne({ url: req.params.url });
        if (!torneo) return next();
            gasto.torneo = torneo._id;
    const id =torneo._id;
    const equipo = new Equipo(req.body);
  
    // Agregrando el usuario que crea la equipo
    equipo.encargado = usuarioO._id;
  
    // Almacenar en la base de datos
    const nuevoEquipo = await equipo.save();
  
    // Redireccionar
   res.redirect("/mostrarEquipo");
  };
