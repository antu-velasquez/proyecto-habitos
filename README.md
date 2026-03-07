# Aplicación de Gestión de Hábitos.

Este proyecto es una herramienta para ayudar a las personas a crear y controlar sus hábitos basándose en el libro "Hábitos Atómicos". Permite el registro, actualización y eliminación de hábitos para fomentar la constancia.

## Tecnologías y dependencias.

- **Node.js**: Entorno de ejecución.
- **Express**: Framework para la creación de la API.
- **Mongoose**: Modelado de objetos para la conexión con MongoDB Atlas.
- **Dotenv**: Gestión de variables de entorno para seguridad de credenciales.

## Configuración inicial.

1. Clonar el repositorio y situarse en la rama **semanal**.
2. Ejecutar el comando **npm install** para instalar todas las dependencias necesarias.
3. Crear un archivo **.env** en la raíz y configurar la variable **MONGO_URI** con tu cadena de conexión (asegúrese de que la IP esté habilitada en Atlas).

## Ejecución.

Para iniciar el servidor y verificar la conexión a la base de datos, utiliza el comando:
node index.js

## Endpoints disponibles.

- **POST /habitos**: Crear un nuevo hábito.
- **PUT /habitos/:id**: Actualizar el progreso de un hábito existente.
- **DELETE /habitos/:id**: Eliminar un hábito del sistema.