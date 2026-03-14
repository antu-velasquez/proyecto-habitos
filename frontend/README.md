# Frontend - Control de Hábitos Atómicos.

Interfaz desarrollada para gestionar el progreso diario de hábitos, visualizando el avance hacia la meta de los 66 días.

## Tecnologías.

* **Next.js**: Framework para la estructura de la aplicación.
* **Redux Toolkit**: Manejo del estado global (conteo de días y reinicio automático).
* **Tailwind CSS**: Diseño visual y barras de progreso dinámicas.

## Funciones principales.

* Obtener la lista de hábitos desde el servidor (petición GET).
* Mostrar una barra de progreso que cambia de color: rojo al inicio, amarillo en la transición y verde al completar el hábito.
* Reiniciar el contador a cero si no se marca la actividad en el día correspondiente.

## Pasos para ejecutar.

1. Instalar dependencias:
   ```bash
   npm install