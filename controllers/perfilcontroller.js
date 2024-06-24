const db = require('../database/models');
const op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const { update } = require('./productocontroller');

const perfilContoller = {

    profile: function(req, res, next) {

        let id = req.params.id;

        let regla = {
            include: [
                {association: "productos"},
                {association: "comentarios"}
            ],
            order: [
                [{model: db.Product, as: 'productos'}, 'createdAt', 'DESC']
            ]
        }
    
        db.Usuario.findByPk(id, regla)

            .then(function(results){

                let condicion = false;

                if (req.session.user != undefined && req.session.user.id == results.id) {
                    condicion = true;
                }

                return res.render('profile', {title: `@${results.usuario}`, usuario: results, productos: results.productos, comentarios: results.comentarios.length, condition: condicion});
            })
            .catch(function(error){
                console.log(error);
            });
    },
    
    register: function(req, res, next){
        if (req.session.user != undefined) {
        return res.redirect("/users/profile/id" + req.session.user.id);
    }
    else {
        return res.render("register", {title: "Register"})
    }
},
    store: (req, res) => {
        let form = req.body;

        let errors = validationResult(req);
   
    if (errors.isEmpty()) {
        
        let usuario = {
            mail: form.email,
            contrasenia: bcrypt.hashSync(form.password, 10),
            usuario: form.username,
            fechaNacimiento: form.birthdate,
            numeroDocumento: form.document_number,
            foto: form.profile_picture
        };

    db.Usuario.create(usuario)
    .then((result) => {
        return res.redirect("/users/login")
    })
    .catch((err) => {
        return console.log(err)
    });
  }
  else{
    return res.render("register", {errors: errors.mapped(), old: req.body})
  }



},
login: function(req, res, next){

    if (req.session.user != undefined) {
        return res.redirect("/users/profile/id/" + req.session.user.id)
    } else {
        return res.render("login", {title: "Login"})
    }
},

loginUser: (req, res, next) => {

    let form = req.body;
    let errors = validationResult(req)

    if (errors.isEmpty()) {
        
        let filtrar = {
            where: [
            {mail: form.email}
            ]
        }

    db.Usuario.findOne(filtrar)
        .then((result) => {
            if (result != null) {
                
                req.session.user = result;
                if (form.remember != undefined) {
                    res.cookie("userId", result.id, {maxAge: 1000 * 60 * 35})
                }
                return res.redirect("/users/profile/id/" + result.id);
            } 
            else {
                return res.redirect("/users/login");
            }

        })
        .catch((err) => {
            return console.log(err);
        });
    }
    else{
        res.render('login', {title: "Login", errors: errors.mapped(),  old: req.body, user: req.session.user});
    }
},
logout: (req,res, next) => {
    req.session.destroy();
    res.clearCookie("userId")
    return res.redirect("/")
},
edit: function(req, res, next) {

    if (req.session.user != undefined) {

        id = req.session.user.id;
        db.Usuario.findByPk(id)
    .then(function (results) {
        return res.render("profileEdit", {title:"Profile Edit", usuario: results});
    })
    .catch(function (err) {
        console.log(err);
    });
    }
    else{
        return res.redirect("/users/login");
    }

},






update: function(req, res) {
let errors = validationResult(req);
let form = req.body;

if (errors.isEmpty()) {

    let filtrar = {
        where: {
        id: req.session.user.id
        }
    } 

    let usuario = {
        mail: form.mail,
        usuario: form.usuario,
        contrasenia: bcrypt.hashSync(form.contrasenia, 10),
        fechaNacimiento: form.fechaNacimiento,
        numeroDocumento: form.numeroDocumento,
        foto: form.foto 
    }

    db.Usuario.update(usuario, filtrar)
    .then((result) => {
        return res.redirect("/users/login")
    })
    .catch((err) => {
        return console.log(err);
    });       
} 
    

else {
   
    return res.render('profileEdit', {title: "Profile Edit", errors: errors.mapped(), old: req.body }); 
}

}
}