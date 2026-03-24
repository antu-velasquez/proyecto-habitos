# Proyecto Control de Hábitos.

Aplicación para la gestión de hábitos diarios basada en "Hábitos Atómicos".

## Entrega Semana 5.

En esta fase se integró un sistema completo de seguridad y autorización:

* **Seguridad en Backend**: Implementación de un middleware para validar tokens JWT en todas las rutas de hábitos.
* **Auth desde el Frontend**: Creación de interfaces para registro y login en Next.js que gestionan la persistencia del token.
* **Envío de JWT**: Configuración de Redux para adjuntar automáticamente el x-auth-token en cada petición al servidor.
* **Flujo Protegido**: Restricción de acceso al dashboard principal para que solo usuarios logueados puedan ver y gestionar sus hábitos.

Se han implementado los siguientes requerimientos:

## Estructura.

- **/backend**: Servidor en Express.js, seguridad con Bcrypt y conexión a MongoDB Atlas.
- **/frontend**: Interfaz de usuario en Next.js con gestión de estado en Redux.

## Ejecución.

### 1. Backend.
1. `cd backend`
2. `npm install`
3. `node index.js`

### 2. Frontend.
1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Abrir en http://localhost:3000

---

*Nota: Es necesario configurar el archivo `.env` en el backend con la variable `MONGO_URI` para la conexión.*