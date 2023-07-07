# Get sobre api/productos

OBJETIVO PRINCIPAL:
-Quiero que recupere de la base de datos todos los productos y devuelva un array en formato json con dichos producutos

PRUEBAS:
-Que la URL funcione=status 200
-Que devuelva un json =conten-Type:application/json
-Que devuelva un array=tipo array
-que nos decueve el numero de productos esperado


1. creamos fichero routes/api.js
2. creamos fichero routes/api/products.js
3. todas las rutas que lleguen a app.js con la url /api hay que enviarlas a api.js
4. todas las rutas que lleguen a api.js con la url /api/products hay que enviarlas a products.js
5. dentro de products.js respondemos a la peticion con res.send('chachi pistachi')


# peticion de requisitos
-post (/api/products)
-body: name, description, price, availabre, departament, stock

PRUEBA:
1. que la url funcione status 200 y content-type
2. ver si tiene definido el _id:
3. comprobar si los datos insertados son correctos

# recuperar un producto por id 
-get /api/products/:productoId