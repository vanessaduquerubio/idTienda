
//organizar y agrupar pruebas pirmer parametro el nombre de la agrupacion y el segundo una funcion en la que metemos las pruebas

//requerimos supertest y se pone con el nombre request
const request = require('supertest')
//importamos la pagina en la que queremos hacer puebas
const app = require('../../src/app')
const mongoose = require('mongoose')
//importar el modelo de producto porque me permite hacer cambios sobre la base de datos
const Product = require('../../src/models/product.model')

describe('API de productos', () => {
    beforeAll(async () => {
        try {
            //antes de que empiecen todas las pruebas me conecto a la base de datos
            await mongoose.connect('mongodb://127.0.0.1:27017/idtienda')
        } catch (error) {
        }
        res.json({ fatal: error.message })
    })

    afterAll(async () => {
        try { // despues de que terminen todas las pruebas me desconecto de la base de datos
            await mongoose.disconnect()
        } catch (error) {
        }
        res.json({ fatal: error.message })

    })

    describe('GET /api/productos', () => {

        let response;
        beforeAll(async () => {
            try {
                //para poder hacer peticiones sin tener arrancada la app se importa super test
                response = await request(app).get('/api/products').send()
            } catch (error) {
                res.json({ fatal: error.message })
            }

        })
        it('deberia devolver status 200', () => {
            //espero que el estatus de la respuesta sea 200
            expect(response.statusCode).toBe(200)
        })

        it('deberia devolver un JSON', () => {
            //espero que la cabecera de la cabecera CONTENGA 'application/json
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('deberia devolver un array', () => {
            //espero que la respuesta del body sea un array
            expect(response.body).toBeInstanceOf(Array)
        })
    })

    describe('POST api/products', () => {
        let response;
        const body = { name: 'Lapices colorines', description: 'felisidad en tus cuadernos', price: 20, department: 'test', available: true, stock: 13 }
        beforeAll(async () => {
            try { //lanzamos la peticion para que me devuelva errores y checks
                response = await request(app).post('/api/products').send(body)
            } catch (error) {
                res.json({ fatal: error.message })
            }
        })
        //tenemos que borrar todos los productos que tengan como departamento 'tests'para dejar la base de datos sin cambios, ya que esto es una prueba
        afterAll(async () => {
            try {
                await Product.deleteMany({ department: 'test' })
            } catch (error) {
                res.json({ fatal: error.message })
            }
        })
        it('deberia de funcionar la URL', () => {
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toContain('application/json')
        })
        it('deberia de tener el _id definido', () => {
            expect(response.body._id).toBeDefined()
        })
        it('deberia de insertar los mismos datos del body', () => {
            expect(response.body.name).toBe(body.name)
            expect(response.body.description).toBe(body.description)
            expect(response.body.department).toBe(body.department)
            expect(response.body.price).toBe(body.price)
            expect(response.body.available).toBe(body.available)
            expect(response.body.stock).toBe(body.stock)


        })
    })

    describe('PUT en api/products/:productId', () => {
        const body = { name: 'Lapices colorines', description: 'felisidad en tus cuadernos', price: 20, department: 'test', available: true, stock: 13 }
        let product;
        let response
        beforeAll(async () => {
            try {
                //creamos un producto para poder editarle y borrarle cuando terminemos la PRUEBA
                product = await Product.create(body)
                response = await request(app).put(`/api/products/${product._id}`).send({
                    available: false,
                    price: 30,
                    stock: 12
                })
            } catch (error) {
                res.json({ fatal: error.message })
            }
        })
        //tenemos que borrar el productos que tengan como department'tests'para dejar la base de datos sin cambios, ya que esto es una prueba
        /*   afterAll(async () => {
              await Product.findByIdAndDelete(product._id)
          }) */
        it('deberia de funcionar la URL y la cabecera deberia de contener applicarion/json', () => {
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toContain('application/json')
        })
        it('deberia ver las modificaciones en la BD', () => {
            //voy a  comprobas si e n la respuesta, concretamente en el vody de la respuesta, available es false
            expect(response.body.available).toBe(false)
            //voy a  comprobas si e n la respuesta, concretamente en el vody de la respuesta, price es 30
            expect(response.body.price).toBe(30)
            //voy a  comprobas si e n la respuesta, concretamente en el vody de la respuesta, stock es 12
            expect(response.body.stock).toBe(12)
        })
    })
    describe('DELETE en api/products/:productId', () => {
        const body = { name: 'Lapices colorines', description: 'felisidad en tus cuadernos', price: 20, department: 'test', available: true, stock: 13 }
        let product;
        let response
        beforeAll(async () => {
            try { //creamos un producto para poder editarle y borrarle cuando terminemos la PRUEBA
                product = await Product.create(body)
                response = await request(app).delete(`/api/products/${product._id}`).send()
            } catch (error) {
                res.json({ fatal: error.message })
            }
        })
        //tenemos que borrar el productos que tengan como department'tests'para dejar la base de datos sin cambios, ya que esto es una prueba
        afterAll(async () => {
            try {
                await Product.findByIdAndDelete(product._id)
            } catch (error) {
                res.json({ fatal: error.message })
            }
        })
        it('deberia de funcionar la URL y la cabecera deberia de contener applicarion/json', () => {
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toContain('application/json')
        })
        it('el producto no debe de estar en la base de datos', async () => {
            try {
                const deleteProduct = await Product.findById(product._id)
                // espero que deleteProduct sea null
                expect(deleteProduct).toBeNull()
            } catch (error) {
                res.json({ fatal: error.message })
            }
        })
    })

})