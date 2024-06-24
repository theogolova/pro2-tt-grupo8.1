var express = require('express');
var router = express.Router();
const {body} = require("express-validator");
const perfilController = require('../controllers/perfilcontrollers');
const db = require('../database/models');
const bcrypt = require("bcryptjs");
const session = require('express-session')

let validacionLogin = [
body('email')
.notEmpty().withMessage('Debes colocar un email').bail()
.isEmail().withMessage('El email debe ser correcto').bail()
.custom(function(value, {req}){
    return db.Usuario.findOne({where: { mail: req.body.email },})
          .then(function(user){
                if(user != undefined){ 
                    return true;
                }
                else{
                    throw new Error ('Este email no existe')
                }
          })
}),

body('password')
.notEmpty().withMessage('Debes de rellenar la contraseña').bail()
.custom(function(value, {req}){

    return db.Usuario.findOne({where: { mail: req.body.email },})
          .then(function(result){
                if(result != undefined){ 

                    let check = bcrypt.compareSync(req.body.password, result.contrasenia);
                    if(!check){
                        throw new Error ('La contraseña no es correcta')
                    }
                }
                else{
                    throw new Error ('Debes registrarte primero para poder acceder')
                }
          })

})
]
let validacionRegistro = [
    body('email')
    .notEmpty().withMessage('Debes completar el mail').bail()
    .isEmail().withMessage("El mail debe ser correcto").bail()
    .custom(function(value){
        return db.Usuario.findOne({where: { mail: value }})
              .then(function(user){
                    if(user == undefined){ 
                        return true;
                    }
                    else{
                        throw new Error ('Este mail es existente')
                    }
              })
    }),

    
    body('username')
    .notEmpty().withMessage('Colocar un nombre usuario'),
    
    body('password')
    .notEmpty().withMessage('Debes elegir una contraseña').bail()
    .isLength({ min: 5 }).withMessage('La contraseña por lo menos debe tener 5 caracteres')
]

let validacionesEditar = [
    body('mail')
    .notEmpty().withMessage('Debes completar el mail').bail()
    .isEmail().withMessage('El mail no es valido').bail(),
    body('usuario')
    .notEmpty().withMessage('Debes elegir un nombre de usuario'),
    
    body('contrasenia')
    .notEmpty().withMessage("Debes de colocar una contraseña").bail()
    .isLength({ min: 5 }).withMessage('La contraseña debe por lo menos tener 5 caracteres')
]

router.get('/login', perfilController.login);
router.post("/login",validacionLogin, perfilController.loginUser);

router.get('/register', perfilController.register);
router.post('/register', validacionRegistro, perfilController.store);

router.get('/profile/id/:id', perfilController.profile);

router.get('/edit', perfilController.edit);
router.post('/edit', validacionesEditar, perfilController.update); 

router.post('/logout', perfilController.logout);

module.exports = router;
