const db = require("../database/models")
const op = db.Sequelize.Op;
const { validationResult } = require("express-validator");

const productContoller = {

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
