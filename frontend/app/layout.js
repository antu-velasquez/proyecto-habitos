import './globals.css'; // Para funcionamiento de Tailwind.
import { Providers } from '../store/Provider'; // Vinculación con tu Redux Store.

export const metadata = {
  title: 'Proyecto Hábitos Atómicos',
  description: 'Aplicación para el seguimiento de hábitos diarios',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* Envolver la aplicación en el Provider de Redux. */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}