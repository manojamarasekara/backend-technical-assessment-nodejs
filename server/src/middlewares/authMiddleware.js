const jwt = require('jsonwebtoken');

const requireRole = (requiredRoles) => (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
          if (err) {
              return res.status(401).json({
                success: false,
                error: 'Unauthorized',
                message: 'Token verification failed. Please ensure that you are using a valid authentication token.'
            });
          } else {
              const userRole = decodedToken.role;

              if (requiredRoles.includes(userRole)) {
                  next();
              } else {
                res.status(403).json({
                    success: false,
                    error: 'Forbidden',
                    message: 'Access denied. You do not have the necessary permissions to access this resource.'
                });
              }
          }
      });
  } else {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Authorization header is missing or invalid. Please ensure that you provide a valid bearer token in the authorization header.'
    });
  }
};


module.exports = { 
  requireRole
};
