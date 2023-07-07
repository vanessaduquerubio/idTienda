//1.importar http y app
const http = require('http');
const app = require('./src/app')


//2. config de .env
require('dotenv').config();

//donfifuracion de la base de datos
require('./src/config/db')

//3. creamos server
const server = http.createServer(app)

//ponemos a escuchar el pueto
const PORT = process.env.PORT || 3000
server.listen(PORT)


server.on('listening', () => console.log(`servidor escuchando en pueerto ${PORT}`))

