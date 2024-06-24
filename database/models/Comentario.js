module.exports = function (sequelize, dataTypes ) {
    let alias = "Comentario";
    let cols = {
        id: {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.INTEGER
        },
        productoId: {
            type : dataTypes.INTEGER
        },
        clienteId: {
            type : dataTypes.INTEGER
        },
        comentario: {
            type : dataTypes.STRING
        },
        createdAt: {
            type : dataTypes.DATE
        },
        updatedAt: {
            type : dataTypes.DATE
        },
        deletedAt: {
            type : dataTypes.DATE
        }
  	}

    let config = {
        tableName: "comentarios",
        timestamps: true,
        underscored: false
    }
    
    let Comentario = sequelize.define(alias, cols, config);

    Comentario.associate = function(models) {

        Comentario.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "clienteId"
        });

        Comentario.belongsTo(models.Product, {
            as: "producto",
            foreignKey:"productoId"
        });
    }
    return Comentario;
}