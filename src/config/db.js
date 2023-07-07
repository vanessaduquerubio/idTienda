//importamos mongoose
const mongoose = require('mongoose')
//conectamos la base de datoss
mongoose.connect(process.env.MONGO_URL)