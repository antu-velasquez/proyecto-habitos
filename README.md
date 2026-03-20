# Proyecto Control de Hábitos

Aplicación para la gestión de hábitos diarios basada en "Hábitos Atómicos".

## Ediciones para la semana 4

Se han implementado los siguientes requerimientos:

- **Seguridad (Auth)**: Registro de usuarios con contraseñas protegidas mediante el proceso de hashing con `bcryptjs`.
- **Lógica de racha**: El backend ahora controla el conteo de días y reinicia el progreso automáticamente si se interrumpe la constancia.
- **Botón Done e interactividad**: Implementación funcional del botón para marcar tareas, enviando actualizaciones PATCH que Redux gestiona en tiempo real.
- **Barra de progreso**: Visualización dinámica que cambia de rojo a verde conforme el usuario se acerca a la meta de los 66 días.

## Estructura

- **/backend**: Servidor en Express.js, seguridad con Bcrypt y conexión a MongoDB Atlas.
- **/frontend**: Interfaz de usuario en Next.js con gestión de estado en Redux.

## Ejecución

### 1. Backend
1. `cd backend`
2. `npm install`
3. `node index.js`

### 2. Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Abrir en http://localhost:3000

---

*Nota: Es necesario configurar el archivo `.env` en el backend con la variable `MONGO_URI` para la conexión.*