//1 importamos express
const express = require('express')
//paso 2 crear variable app para poder exportarla y usarla 

const app = express()
//configuramos app express para poder recibir objetos json
app.use(express.json())

//creamos urls
app.get('/', (req, res) => {
    res.send('holi amiguis')
})
app.use('/api', require('./routes/api'))

//3.exporto app para poder usarla 
module.exports = app