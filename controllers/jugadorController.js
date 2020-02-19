const mongoose = require("mongoose");
const Torneo = require('../models/modeloTorneo');
const Equipo = require('../models/modeloEquipo');
const Jugador = require('../models/modeloJugador');
//const Vacante = mongoose.model("Vacante");
//const { isAuthenticated } = require('../helpers/auth');
const Usuario = require('../models/modeloUsuario');

exports.formularioNuevoJugador =  async (req, res, next) => {

  const equipo = await Equipo.findOne({ url: req.params.url });
  res.render("jugador/nuevoJugador", {
    nombrePagina: "Nuevo jugador",
    tagline: "¡Liga Jesús Sacramentado!",
    equipo
  });
  
};

  // Agregar un nueva jugador a la base de datos
exports.agregarJugador = async (req, res,next) => {
    const usuarioO = req.user;
    //console.log("estos son los datos que trae el jugador");
    //console.log(req.body);
    const usuario = await Usuario.findOne({ _id: usuarioO._id });
    const equipo = await Equipo.findOne({ url: req.params.url });
    if (!equipo) return next();
      //console.log(equipo._id);
      //const categoria = await Categoria.findOne({ _id: req.params.nombre });
       
      const url = equipo.url;
     
      const jugador = new Jugador(req.body);
      jugador.urlEquipo = url;

  
    // Almacenar en la base de datos
    const nuevoJugador = await jugador.save();
    req.flash("success", ["Nuevo jugador agregado satisfactoriamente!"]);
  
    // Redireccionar
   res.redirect("/nuevoJugador/:url");
  };
