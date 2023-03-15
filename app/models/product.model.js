module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
      "product", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING
        },
        price: {
          type: DataTypes.INTEGER
        },
        // En stock
        published: {
          type: DataTypes.BOOLEAN
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE
        }
        // TVA, Quantité, DLC, Ingrédients, tNuriscore...
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );
  
    return Product;
  };