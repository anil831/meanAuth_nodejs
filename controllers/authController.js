const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');
dotenv.config();

const ScreenAccess = require('../models/screenAccess');
const LoginHistory = require("../models/LoginHistory");
const Token = require("../models/Token");

const {generateAccessToken,generateRefreshToken,verifyToken} = require('../utils/jwt');

const constants = require("../constants");


exports.login = async (req, res) => {
  try{
    const { email, password } = req.body;

    const user = await User.findOne({ email },{__v:0,createdAt:0,updatedAt:0}).lean();
    if (user && bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken({_id:user._id});
      const refreshToken = generateRefreshToken({_id:user._id});
         console.log("user",user);
        
         const roles = user.role.map(item => item)
      const screenAccess = await ScreenAccess.findOne({role:{$in:roles}}).populate('role').populate('screen').lean();

      let screens;
      if(screenAccess){
        screens = screenAccess.screen.map(item => item.name);
      }

      // Set cookie expiry times using maxAge
       const accessTokenMaxAge = constants.ACCESS_TOKEN_MAX_AGE;
       const refreshTokenMaxAge = constants.REFRESH_TOKEN_MAX_AGE;
       console.log("maxAge",accessTokenMaxAge,refreshTokenMaxAge);
       
       const expiresAt = new Date(Date.now() + refreshTokenMaxAge);

      res.cookie('accessToken', accessToken, { 
        httpOnly: true, 
        secure: true, 
        maxAge: accessTokenMaxAge 
      });
      res.cookie('refreshToken', refreshToken, { 
        httpOnly: true, 
        secure: true, 
        maxAge: refreshTokenMaxAge 
      });
     
      const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];

      await LoginHistory.create({userId:user._id,loginAt:new Date(),ipAddress,userAgent});
      await Token.create({refreshToken,expiresAt,userId:user._id})
      

      const {password,role,...rest} = user;

      console.log(screens);
      
     return res.json({user:rest,screens:screens});
    } else {
      
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }catch(error){
    console.log(error);
      
   return res.status(401).json({ message: 'Invalid credentials' });

  }

};

exports.refreshAccessToken = async (req, res) => {
  console.log("refreshToken is triggered");

  const refreshToken = req.cookies?.refreshToken;

  if(!refreshToken){
    return res.status(401).json({ error: 'Refresh token not found or expired' });
  }

  try {
    const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    console.log("decoded :",decoded);
    
    const newAccessToken = generateAccessToken({_id:decoded._id});
    const accessTokenMaxAge = constants.ACCESS_TOKEN_MAX_AGE;

    res.cookie('accessToken', newAccessToken, { 
      httpOnly: true, 
      secure: true, 
      maxAge: accessTokenMaxAge // 15 minutes
    });

    res.status(200).json({ message: 'Access token refreshed' });
  } catch (err) {
    // Token verification failed
    return res.status(403).json({ error: 'Invalid or expired refresh token' });
  }

};

exports.createNewRefreshToken = async (req, res) => {
  console.log("createNewRefreshToken is triggered");

  const refreshToken = req.cookies?.refreshToken;
  
  if(!refreshToken){
    return res.status(401).json({ error: 'Refresh token not found or expired' });
  }

  try {
    const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    console.log("decoded :",decoded);
    
    const newRefreshToken = generateRefreshToken({_id:decoded._id});
    const refreshTokenMaxAge = constants.REFRESH_TOKEN_MAX_AGE;

    res.clearCookie('refreshToken',  { 
      httpOnly: true, 
      secure: true
    });
  

    res.cookie('refreshToken', newRefreshToken, { 
      httpOnly: true, 
      secure: true, 
      maxAge: refreshTokenMaxAge 
    });

    Token.updateOne({ refreshToken}, { $set: { refreshToken: newRefreshToken } })


    res.status(200).json({ message: 'Access token refreshed' });
  } catch (err) {
    // Token verification failed
    return res.status(403).json({ error: 'Invalid or expired refresh token' });
  }

};

exports.checkAuth = async(req, res) => {

    return res.status(200).json({ isAuthenticated: true, message:"User is Authenticated Successfully"});
}

exports.logout = async(req,res)=>{

  console.log("logout api is called");
  
  const refreshToken = req.cookies?.refreshToken;
  console.log("refreshToken :",refreshToken);
  
  

  // if(!refreshToken){

  //   const {userId} = req.body;
  //   const token = await Token.findOne({userId},{_id:0,__v:0,expiresAt:1}).lean();

  //   if(token){
    
  //     const currentTime = new Date();
      
  //     if (new Date(token.expiresAt) < currentTime) {
        
  //       await LoginHistory.updateOne({ userId }, { $set: { logoutAt: currentTime } });
  //     }
  //   }

  // }

  if(refreshToken){
    try{
      const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
      const currentTime = new Date();

      await Promise.all([
        Token.findOneAndDelete({refreshToken}),
        LoginHistory.updateOne({ userId:decoded._id }, { $set: { logoutAt: currentTime } })
      ])

      console.log("ffffffffffffffff");
      
    }catch(err){
      return res.status(403).json({ error: 'Invalid or expired refresh token' });
    }


  }
  console.log("yyyyyyyyyyyyyyyyyyyyyyyyy");
  

  // Clear cookies
  res.clearCookie('accessToken',  { 
    httpOnly: true, 
    secure: true
  });
  res.clearCookie('refreshToken',  { 
    httpOnly: true, 
    secure: true
  });

  // if (refreshToken) {
    
  //   await LoginHistory.updateOne({ userId: req.user.id }, { $set: { logoutAt: new Date() } });
  // }
  res.status(200).json({ message: 'Logged out successfully' });
}