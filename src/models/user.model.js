// necesito dos cosas de mongoose
const { model, Schema } = require('mongoose')

// aqui especificamos la estructura de los objetos que van a formar nuestra coleccion, con los tipos
//el segundo parametro son opciones timestamp, pone automaticamente la fecha de cuando se crea y cuando se edita


const userSchema = new Schema({
    username: String,
    email: String,
    password: Number,
    //para poner un valor por defecto 
    role: {
        type: String,
        //si no pasamos un rol se pone default por defecto 
        default: 'regular'
    },
    //para crear relaciones se almacenan los identificadores de los productos entre corchetes y llaves es una relacion 1N
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }]

}, { timestamps: true, versionKey: false })
// exporto la ejecucion model, que nos va a permitir enlazar la coleccion de la base de datos con el esquema que acabamos de generar 
//versionKey, es un campo que se añada cada vez que modificas un campo quedando registro de este

// en module.exports exportamos model y metemos como parametro el nombre de la coleccion SIEMPRE en singular
module.exports = model('user', userSchema)