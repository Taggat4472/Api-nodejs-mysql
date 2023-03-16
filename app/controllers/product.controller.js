const db = require("../models/index");
const Product = db.product;
const Op = db.Sequelize.Op;

// Ajouter un nouveau produit
exports.create = async (req, res) => {
  try {
    console.log("image", req.file);
    const { name, price, published } = req.body;
  
    const newProduct = {
                          name,
                          price,
                          published,
                          filename: req.file.originalname,
                          filepath: req.file.path,
                          filetype: req.file.mimetype,
                          filesize: req.file.size,
                        };
   
    const saveNewProduct = await Product.create(newProduct);
    if (saveNewProduct) res.json({ 
      message: 'Ajout avec succès', 
      success: 1,
      profile_url: `http://localhost:${process.env.PORT}/uploads/images/${req.file.filename}`
    });
  }
  catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Product."
    });
  }

};

// Affiche tous les produits
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Product.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving products."
      });
    });
};

// Affiche un produit par son ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Product with id = ${id}`
      });
    });
};

// Mettre à jour le produit
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Supprimer le produit
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Supprimer tous les produits
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all products."
      });
    });
};

// Trouver tous les produits en stock
exports.findAllPublished = (req, res) => {
  Product.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products."
      });
    });
};
