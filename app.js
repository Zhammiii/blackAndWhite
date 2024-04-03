const express = require('express')
const app = express()
const PORT = 3000
const Jimp = require('jimp')
const fs = require('fs');
const { v4 } = require('uuid');


/* middlewares*/
app.use('/css', express.static(__dirname + "/public/assets/css/"));


/* Rutas */
app.get('/', (req , res) => {
    try {
        res.sendFile(`${__dirname}/public/index.html`);
    } catch (error) {
        res.status(500).send(error.message); 
    }
})

app.get('/process', async (req , res) =>{
    try {
        


        
    } catch (error) {
        res.status(500).send(error.message); 
    }
} )

/* Levantar servidor */
app.listen (PORT, () =>{
console.log('Conectado al puerto ' + PORT);
})