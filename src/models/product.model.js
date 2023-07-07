// necesito dos cosas de mongoose
const { model, Schema } = require('mongoose')

// aqui especificamos la estructura de los objetos que van a formar nuestra coleccion, con los tipos
//el segundo parametro son opciones timestamp, pone automaticamente la fecha de cuando se crea y cuando se edita
const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    department: String,
    available: Boolean,
    stock: Number

}, { timestamps: true, versionKey: false })
// exporto la ejecucion model, que nos va a permitir enlazar la coleccion de la base de datos con el esquema que acabamos de generar 
module.exports = model('product', productSchema)