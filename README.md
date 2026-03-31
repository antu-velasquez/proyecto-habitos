# Proyecto Control de Hábitos.

Aplicación para la gestión de hábitos basada en "Hábitos Atómicos", desplegada en la nube.

## Entrega Semana 6: Despliegue Cloud.

En esta fase se migró el entorno local a producción:

* **Hosting:** Frontend y Backend publicados en **Vercel**.
* **Base de Datos:** Conexión activa a **MongoDB Atlas**.
* **Seguridad:** Configuración de variables de entorno (`JWT_SECRET`, `MONGO_URI`) y políticas **CORS**.

## Enlaces del proyecto.

* **Frontend:** [https://proyecto-habitos-4zur.vercel.app](https://proyecto-habitos-4zur.vercel.app)
* **Backend:** [https://proyecto-habitos-one.vercel.app](https://proyecto-habitos-one.vercel.app)

## Estructura.

- **/backend**: Servidor Node.js/Express con seguridad JWT.
- **/frontend**: Interfaz Next.js con gestión de estados.

## Ejecución local.

1. **Backend:** `npm install` y `node index.js` (requiere archivo `.env`).
2. **Frontend:** `npm install` y `npm run dev` (abre en localhost:3000).

---
*Nota: El despliegue incluye un archivo `vercel.json` para permitir la comunicación segura entre dominios.*