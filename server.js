const express = require("express");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());// body parser
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Créer une variable globale
global.__basedir = __dirname;

// Déclaration du dossier "uploads" comme dossier statique
app.use('/uploads', express.static('uploads'));

// connexion mariaDB
const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  // Test GET /
app.get("/", (req, res) => {
    res.json({ message: "Bonjour ! 👋." });
  });
 
// API routes
require("./app/routes/product.routes")(app);
require("./app/routes/auth.routes")(app);
 
// Port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});