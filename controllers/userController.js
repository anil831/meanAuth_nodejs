const User = require('../models/User');
const Role = require('../models/Role');

exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;
  try{
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'User created' });
  }catch(error){
    res.status(500).json({message:"Interner Server Error"})
  }

};

exports.getUsers = async (req, res) => {
  try{
    const users = await User.find().populate('role');
    res.json(users);
  }catch(error){
    console.log(error);
    res.status(500).json({message:"Internal Server Error"})
  }

};
