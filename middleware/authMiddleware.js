const { verifyToken } = require('../utils/jwt'); // Adjust the path as needed
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = async (req, res, next) => {

  // console.log("req.cookies :",req.cookies);
  
  const accessToken = req.cookies?.accessToken;

  
  if (!accessToken) {
    console.log("cookies ::",req.cookies);
    
    return res.status(401).json({isAuthenticated:false, message: 'Access token is not found or expired' });
  }

  try {
    // Verify the access token
    const decoded = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    
    // Attach the decoded user info to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Token verification failed
    return res.status(403).json({isAuthenticated:false, message: 'Invalid or expired access token' });
  }
};

module.exports = authMiddleware;
