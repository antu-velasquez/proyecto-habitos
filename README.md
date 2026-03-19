# Proyecto Control de Hábitos

Aplicación Full Stack para la gestión de hábitos diarios basada en "Hábitos Atómicos".

## Entrega para la semana 3

Se han implementado los siguientes requerimientos:
- **Tailwind CSS**: Integración de la librería para el diseño del frontend.
- **Redux Toolkit**: Gestión de estado global para una lista de hábitos dinámica.
- **Componentes UI**: Inclusión de barra de progreso (hacia los 66 días) y botón Done.

## Estructura

- **/backend**: Servidor en Express.js y conexión a MongoDB Atlas.
- **/frontend**: Interfaz de usuario en Next.js.

## Ejecución

### 1. Backend

1. `cd backend`
2. `npm install`
3. `node index.js`

### 2. Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Abrir [http://localhost:3000](http://localhost:3000)

---

*Nota: Es necesario configurar el archivo `.env` en el backend para la conexión a la base de datos.*