const express = require("express");
const app = express();
const PORT = 3000;
const Jimp = require("jimp");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

/* middlewares*/
app.use("/css", express.static(__dirname + "/public/assets/css/"));

/* Rutas */
app.get("/", (req, res) => {
  try {
    res.sendFile(`${__dirname}/public/index.html`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/process", async (req, res) => {
  try {
    let urlData = req.query.urlData; 
    console.log(urlData);
    if (!urlData) {
      throw new Error("Missing URL data");
    }
    res.setHeader("Content-Type", "image/png");
    const imagen = await Jimp.read(urlData);
    let nombreImagen = uuidv4().slice(0, 8) + "-nuevaImagen.png";
    const rutaImagen = `public/assets/img/${nombreImagen}`;
    await imagen.resize(350, Jimp.AUTO).greyscale().writeAsync(rutaImagen);
    const imagenData = fs.readFileSync(rutaImagen);
    res.send(imagenData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* Levantar servidor */
app.listen(PORT, () => {
  console.log("Conectado al puerto " + PORT);
});
