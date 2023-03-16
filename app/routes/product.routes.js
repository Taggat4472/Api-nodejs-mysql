module.exports = app => {
    const productController = require("../controllers/product.controller.js");
    const {uploadFile} = require("../middlewares");
    const router = require("express").Router();
  
    // Create a new Product
    router.post("/add", uploadFile.single("image"), productController.create);
  
    // Retrieve all Products
    router.get("/list", productController.findAll);
  
    // Retrieve all published Products
    router.get("/published", productController.findAllPublished);
  
    // Retrieve a single Product with id
    router.get("/:id", productController.findOne);
  
    // Update a Product with id
    router.put("/:id", productController.update);
  
    // Delete a Product with id
    router.delete("/delete/:id", productController.delete);
  
    // Delete all Products
    router.delete("/delete-all", productController.deleteAll);
  
    app.use("/api/product", router);
  };