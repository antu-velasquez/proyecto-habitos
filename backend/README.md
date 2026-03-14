# Backend - API de Control de Hábitos.

Este servidor maneja la lógica de negocio y el almacenamiento de los hábitos, asegurando que la información se sincronice correctamente con la base de datos en la nube.

## Tecnologías.

* **Node.js y Express**: Para la creación de la API y el manejo de rutas.
* **Mongoose**: Para la conexión y el modelado de datos con MongoDB Atlas.
* **Dotenv**: Para proteger las credenciales y variables de entorno.

## Endpoints principales.

* **GET /habitos**: Recuperar la lista de hábitos para el frontend.
* **POST /habitos**: Guardar un nuevo hábito.
* **PUT /habitos/:id**: Actualizar el progreso diario.
* **DELETE /habitos/:id**: Eliminar un hábito.

## Instrucciones de ejecución.

1. Instalar las dependencias con `npm install`.
2. Configurar el archivo `.env` con la clave de acceso a MongoDB (`MONGO_URI`).
3. Iniciar el servidor con el comando `node index.js`.