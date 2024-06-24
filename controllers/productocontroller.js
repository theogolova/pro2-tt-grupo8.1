const db = require("../database/models")
const op = db.Sequelize.Op;
const { validationResult } = require("express-validator");

const productContoller = {
    delete: function(req, res) {
        let form = req.body;
        
        let filtrado = {
          where: {
            id: form.id
          }
        }  
        
       if (req.session.user != undefined) {
            let id = req.session.user.id;
            if (form.idUsuario == id) {
                db.Product.destroy(filtrado)
                .then((result) => {
                  return res.redirect("/");
                })
                .catch((err) => {
                  return console.log(err);
                });
            }
            else{
                return res.redirect("/users/profile/id/" + id);
            }
        }
        else{
            return res.redirect("/users/login");
        }  
    },  
    product: function (req, res) {

        let id = req.params.id;

        let criterio = {
            include: [
                {association: "usuario"},
                {association: "comentarios",
                include: [{association: "usuario"}]
                }
            ],
            order: [[{model: db.Comentario, as: "comentarios"}, "createdAt", "DESC"]]
        };

        let condition = false;

        db.Product.findByPk(id, criterio)
        .then(function(results){
            if (req.session.user != undefined && req.session.user.id == results.usuario.id){
                condition = true;
            }
            return res.render("product", {productos: results, comentarios: results.comentarios, condition: condition})
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    create: function(req, res) {
        if(req.session.user != undefined){
            return res.render("productAdd",{title: "Add Product"})
        }
        else{
            return res.redirect("/users/login")
        }
        
    },

    store: function(req, res) {
        let form = req.body;
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            
            db.Product.create(form)
            .then((result) => {
                return res.redirect("/product/id/" + result.id)
            }).catch((err) =>{
                return console.log(err);
            });
        }
        else{
            return res.render("productAdd", {errors: errors.mapped(), old:req.body});
        }
    },
    
}

module.exports = productContoller;
