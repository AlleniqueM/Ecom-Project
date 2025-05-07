const jwt = require('jsonwebtoken');

const jwt_secret = process.env.SECRET1;


const authenticateToken = (req, res, next)=> {
  // Check multiple possible header locations
  const authHeader = req.headers['authorization'] || 
                    req.headers['Authorization'] ||
                    req.header('authorization');

  console.log('Received headers:', req.headers); // Debug
  
  if (!authHeader) {
    return res.status(401).json({ 
      message: 'Authorization header missing',
      receivedHeaders: req.headers // For debugging
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Malformed token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};
const adminOnly = (req, res, next) => {
  try {
    if(req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Admin privileges required'});
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Authorization check failed'})
  }
}

module.exports = { authenticateToken, jwt_secret, adminOnly}