const mongoose = require("mongoose");
const Torneo = require('../models/modeloTorneo');
const Equipo = require('../models/modeloEquipo');
//const Vacante = mongoose.model("Vacante");
//const { isAuthenticated } = require('../helpers/auth');
const Usuario = require('../models/modeloUsuario');

exports.formularioNuevoEquipo =  async (req, res, next) => {
  const usuarioO = req.user;
  const torneo = await Torneo.findOne({ url: req.params.url });
  const usuario = await Usuario.findOne({ _id: usuarioO._id });
  res.render("equipos/nuevoEquipo", {
    nombrePagina: "Nuevo equipo",
    tagline: "¡Liga Jesús Sacramentado!",
    torneo, 
    usuario
  });
  
};

  // Agregar un nueva equipo a la base de datos
exports.agregarEquipo = async (req, res,next) => {
    const usuarioO = req.user;
    //console.log("estos son los datos que trae el equipo");
    //console.log(req.body);
    const usuario = await Usuario.findOne({ _id: usuarioO._id });
    const torneo = await Torneo.findOne({ url: req.params.url });
    if (!torneo) return next();
      //console.log(torneo._id);
      //const categoria = await Categoria.findOne({ _id: req.params.nombre });
       
      const url = torneo.url;
      const categoria = torneo.categoria;
      const equipo = new Equipo(req.body);
      equipo.urlTorneo = url;
      equipo.categoria = categoria;
      // Agregrando el usuario que crea la equipo
      equipo.encargado = usuario.nombre;
  
    // Almacenar en la base de datos
    const nuevoEquipo = await equipo.save();
    req.flash("success", ["Nuevo equipo agregado satisfactoriamente!"]);
  
    // Redireccionar
   res.redirect("/mostrarEquipos");
  };

  exports.mostrarEquipo = async (req, res, next) => {
  
    try {
      const usuarioO = req.user;
      const usuario = await Usuario.findOne({ _id: usuarioO._id }); 
      const equipos = await Equipo.find({urlTorneo: req.params.url });
      // Si no hay resultados
      if (!equipos) return next();
        console.log(equipos.nombreEquipo);
        const nombre= usuario.nombre;
        res.render("equipos/mostrarEquipos", {
          nombrePagina: "Equipos",
          equipos,
          nombre
        }); 
    
    
  } catch (error) {
    // Ingresar el error al arreglo de errores
   console.log("no se poe");
   
     
  }
 
  };