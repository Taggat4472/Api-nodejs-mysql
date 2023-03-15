const express = require("express");

const app = express();

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
 
  // Port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});