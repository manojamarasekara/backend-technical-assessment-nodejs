const jwt = require('jsonwebtoken');

const requireRole = (requiredRoles) => (req, res, next) => {
  // Extract the authorization header
  const authHeader = req.headers['authorization'];

  // Check if the authorization header is present and starts with 'Bearer'
  if (authHeader && authHeader.startsWith('Bearer ')) {
      // Extract the token from the authorization header
      const token = authHeader.split(' ')[1];

      // Verify the token
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
          if (err) {
              // If token is not valid, send unauthorized response
              return res.status(401).json({ error: 'Unauthorized' });
          } else {
              // Extract user role from decoded token payload
              const userRole = decodedToken.role;

              // Check if the user has any of the required roles
              if (requiredRoles.includes(userRole)) {
                  // User has one of the required roles, allow access
                  next();
              } else {
                  // User does not have any of the required roles, send forbidden response
                  res.status(403).json({ error: 'Forbidden' });
              }
          }
      });
  } else {
      // If authorization header is not present or is invalid, send unauthorized response
      return res.status(401).json({ error: 'Unauthorized' });
  }
};


module.exports = { 
  requireRole
};
