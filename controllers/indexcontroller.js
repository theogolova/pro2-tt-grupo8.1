const db = require("../database/models")
const op = db.Sequelize.Op;

const indexController = {
    index: function (req, res) {

        let filtrar = {
            order: [["createdAt", "DESC"]],
            include: [
                {association: "comentarios"},
                {association: "usuario"}
            ]
        }
       
        db.Product.findAll(filtrar)
        .then(function (results) {

            return res.render("index", {productos: results, user: req.session.user, userId:req.cookies.userId, usuario: req.session.user})
    
        })
        .catch(function (error) {
            console.log(error);
        });


        
    },
    
    search: function(req, res){

        let search = req.query.search;

        let filtro = {
            where: {
                [op.or]: [
                {nombreProd: {[op.like]: "%" + search + "%"}},
                {descripcion: {[op.like]: "%" + search + "%"}}
                ]
            },
            order: [["createdAt", "DESC"]],
            include: [
                {association: "comentarios"},
                {association: "usuario"}
            ]
        }

        db.Product.findAll(filtro)
        .then(function(results){
            return res.render('searchResults', {productos: results, usuario: req.session.user});
        })
        .catch(function(error){
            console.log(error);
        });
         }
}

module.exports = indexController;