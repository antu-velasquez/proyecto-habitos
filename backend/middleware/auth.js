const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Leer el token del encabezado de la petición.
  const token = req.header('x-auth-token');

  // Revisar si no hay token.
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso no válido' });
  }

  // Validar el token.
  try {
    const cifrado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = cifrado.user; // Añadir el usuario al objeto request.
    next(); // Continuar a la ruta.
  } catch (error) {
    res.status(401).json({ msg: 'Token no es válido' });
  }
};