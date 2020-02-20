const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const ligaController = require("../controllers/ligaController");
const equipoController = require("../controllers/equipoController");
const torneoController = require("../controllers/torneoController");
const usuarioController = require("../Controllers/usuarioController");
const jugadorController = require("../controllers/jugadorController");
const authController = require("../controllers/authController");

module.exports = () => {
  router.get("/", ligaController.homeLiga);


  //Iniciar sesion
  router.get("/iniciarSesion", usuarioController.formularioInicioSesion);
  router.post("/iniciarSesion", authController.autenticarUsuario);
  //Crear una nueva cuenta
  router.get("/crearCuenta", usuarioController.formularioCrearUsuario);
  router.post(
    "/crearCuenta",
    [
      // Verificar los atributos del formulario
      // https://express-validator.github.io/docs/index.html
      check("nombre", "El nombre de usuario es requerido.")
        .not()
        .isEmpty().escape(),
        check("correo", "El correo electrónico es requerido.")
        .not()
        .isEmpty(),
      check("correo", "El correo electrónico no es vålido.")
        .isEmail()
        .normalizeEmail(),
      check("confirmpassword", "Debe ingresar la confirmación de tu contraseña")
        .not()
        .isEmpty(),
      check(
        "confirmpassword",
        "La confirmación de la contraseña no coincide con tu contraseña"
      ).custom((value, { req }) => value === req.body.contrasena)
    ],
    usuarioController.agregarUsuario
  );
 router.post("/iniciarSesion", authController.autenticarUsuario);
 // Cerrar sesión
 router.get("/cerrarSesion", authController.verificarUsuario,authController.cerrarSesion);
//Torneos
  //router.get("/nuevoTorneo", presupuestoController.formularioTorneo);
 //router.post("/nuevoTorneo", presupuestoController.crearTorneo);

router.get("/nuevoTorneo", torneoController.formularioTorneo);
//router.post("/nuevoTorneo", torneoController.autenticarUsuario);

router.post("/nuevoTorneo",authController.verificarUsuario, torneoController.agregarTorneo);
 
// Mostrar una torneo
router.get("/mostrarTorneos", torneoController.mostrarTorneo);
router.get("/allTorneos", torneoController.mostrarTorneoAll);

/*
// Editar un torneo
router.get(
"/editarTorneo/:url",
authController.verificarUsuario,
torneoController.formularioEditarTorneo
);
router.post(
"/editarTorneo/:url",
authController.verificarUsuario,
torneoController.editarTorneo
);

// Eliminar un torneo
router.post("/delete/:_id", torneoController.eliminarTorneo);
*/

//Agregar un equipo
router.get("/nuevoEquipo/:url", equipoController.formularioNuevoEquipo);

router.post("/nuevoEquipo/:url",authController.verificarUsuario,equipoController.agregarEquipo);

// Mostrar los equipos
 router.get("/mostrarEquipos/:url", equipoController.mostrarEquipo);
/*
// Editar una equipo
router.get(
"/editarEquipo/:url",
authController.verificarUsuario,
equipoController.formularioEditarEquipo
);
router.post(
"/editarEquipo/:url",
authController.verificarUsuario,
equipoController.editarEquipo
);

// Eliminar una equipo
router.delete("/delete/:_id", equipoController.eliminarEquipo);

 */
 // Reestablecer la contraseña del usuario
 router.get("/reestablecer",authController.formularioReestablecerContrasena);
router.post("/reestablecer", authController.enviarToken);
router.get("/reestablecer/:token",authController.formularioNuevoContrasena);
router.post("/reestablecer/:token",authController.almacenarNuevaContrasena);

// Buscador
//router.post("/buscador", vacanteController.buscarVacantes);

/* router.get("/totalTorneo/:_id",presupuestoController.verTodo); */

//Agregar un jugador
router.get("/nuevoJugador/:url", jugadorController.formularioNuevoJugador);

router.post("/nuevoJugador/:url",authController.verificarUsuario,jugadorController.agregarJugador);

// Mostrar los jugadors
/* router.get("/mostrarJugador/:_id", jugadorController.mostrarJugadors);

// Editar una jugador
router.get(
"/editarJugador/:url",
authController.verificarUsuario,
jugadorController.formularioEditarJugador
);
router.post(
"/editarJugador/:url",
authController.verificarUsuario,
jugadorController.editarJugador
);

// Eliminar una jugador
router.delete("/delete/:_id", jugadorController.eliminarJugador);

 */

return router;

};
