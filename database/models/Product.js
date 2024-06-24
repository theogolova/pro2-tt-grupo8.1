module.exports = function(sequelize, dataTypes) {
    let alias = "Product";

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type:  dataTypes.INTEGER
        },
        clienteId: {
            type: dataTypes.INTEGER
        },
        imagenProd: {
            type: dataTypes.STRING
        },
        nombreProd: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        },
        deletedAt: {
            type: dataTypes.DATE
        },
        
    };
    let config = {
        tableName: "productos",
        timestamps: true,
        underscored: false

    };

    let Product = sequelize.define(alias, cols, config)

    Product.associate = function (models) {
        
        Product.belongsTo(models.Usuario,{
            as: "usuario", 
            foreignKey: "clienteId"
        });
        
        Product.hasMany(models.Comentario, {
            as: "comentarios",
            foreignKey: "productoId"
        });
    }

    return Product; 
}