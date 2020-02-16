const mongoose = require("mongoose");
//const Torneo = mongoose.model("torneo");
const Torneo = require('../models/modeloTorneo');
//const Gastos = require("../models/modeloGastos");
//const Vacante = mongoose.model("Vacante");
//const { isAuthenticated } = require('../helpers/auth');
const Usuario = require('../models/modeloUsuario');

/* exports.homeTorneo = async (req, res, next) => {
  res.render("inicio", {
    nombrePagina: " MasterTorneo",
    tagline: "¡Liga Jesús Sacramentado!"
  });
}; */

exports.formularioTorneo =  async (req, res, next) => {
 
  res.render("torneos/nuevoTorneo", {
    nombrePagina: "Nuevo torneo",
    tagline: "¡Liga Jesús Sacramentado!"
  });
  req.flash("success", ["Bienvenido"]);
};



  // Agregar un nueva torneo a la base de datos
exports.agregarTorneo = async (req, res) => {
    const usuarioO = req.user;
    //console.log("estos son los datos que trae el torneo");
    //console.log(req.body);
  
    const torneo = new Torneo(req.body);
  
    // Agregrando el usuario que crea la torneo
    torneo.usuario = usuarioO._id;
  
    // Almacenar en la base de datos
    const nuevoTorneo = await torneo.save();
  
    // Redireccionar
   res.redirect("/mostrarTorneo");
  };

exports.mostrarTorneoAll = async(req,res, next)=> {
  const torneos = await Torneo.find();
    // Si no hay resultados
  if (!torneos) return next();
          //console.log(torneos.nombreTorneo);
    const nombre= "UNICAH";
    res.render("torneos/allTorneos", {
      nombrePagina: "Torneos",
      torneos,
      nombre
    }); 
}    
 
exports.mostrarTorneo = async (req, res, next) => {
  
    try {
      const usuarioO = req.user;
      const usuario = await Usuario.findOne({ _id: usuarioO._id }); 

      const torneos = await Torneo.find({ usuario: usuarioO._id });
      // Si no hay resultados
      if (!torneos) return next();
        console.log(torneos.nombreTorneo);
        const nombre= usuario.nombre;
        res.render("torneos/mostrarTorneos", {
          nombrePagina: "Torneos",
          torneos,
          nombre
        }); 
    
    
  } catch (error) {
    // Ingresar el error al arreglo de errores
   console.log("no se poe");
   
     
  }
 
  };