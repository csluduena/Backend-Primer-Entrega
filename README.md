# Proyecto de Backend para la Academia Coderhouse

Este proyecto forma parte de la primera entrega para el curso de Backend en la academia Coderhouse. El objetivo del proyecto es desarrollar una API RESTful para gestionar productos y carritos de compra mediante Node.js y Express.

## Características del Proyecto

- **Gestión de Productos:** Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos.
- **Gestión de Carritos:** Permite crear carritos, agregar productos a carritos existentes y listar productos de un carrito específico.

## Estructura del Proyecto

tu-proyecto/
├── public/
│ ├── index.html
│ └── styles.css
├── data/
│ ├── productos.json
│ └── carrito.json
├── routes/
│ ├── product-routes.js
│ └── cart-routes.js
├── manager/
│ ├── cart-manager.js
│ └── product-manager.js
├── server.js
└── ...otros archivos

## Tecnologías Utilizadas

- **Node.js:** Plataforma de desarrollo backend.
- **Express:** Framework de Node.js para construir aplicaciones web y APIs.
- **JSON:** Utilización de archivos JSON para almacenar datos de productos y carritos.
- **Postman:** Herramienta para probar y documentar APIs.

## Endpoints Disponibles

### Productos

- `GET /api/products`: Lista todos los productos.
- `GET /api/products/:pid`: Obtiene un producto por su ID.
- `POST /api/products`: Crea un nuevo producto.
- `PUT /api/products/:pid`: Actualiza un producto existente.
- `DELETE /api/products/:pid`: Elimina un producto por su ID.

### Carritos

- `POST /api/carts`: Crea un nuevo carrito.
- `GET /api/carts/:cid`: Obtiene los productos de un carrito por su ID.
- `POST /api/carts/:cid/product/:pid`: Agrega un producto al carrito especificado.
- `DELETE /api/carts/:cid`: Elimina un carrito por su ID.

## Ejecución del Proyecto

1. Clonar el repositorio.
2. Instalar las dependencias con `npm install`.
3. Ejecutar el servidor con `node server.js`.
4. Utilizar Postman u otro cliente API para probar los diferentes endpoints.

## Pruebas con Postman

Para probar los endpoints, puedes utilizar Postman siguiendo estos pasos:

1. Abrir Postman.
2. Crear una nueva colección y agregar las diferentes peticiones (GET, POST, PUT, DELETE) con las rutas mencionadas en los endpoints.
3. Probar cada petición y verificar las respuestas del servidor.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún problema o tienes alguna sugerencia, no dudes en abrir un issue en el repositorio.

## Autor

Sebastián Ludueña - [Linkedin](https://www.linkedin.com/in/csluduena/)