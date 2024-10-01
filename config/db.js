const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Role = require('../models/Role');
const User = require("../models/User");

const bcryptjs = require("bcryptjs");


const connectDB = async () => {
    try{

        await mongoose.connect(process.env.MONGODB_URI);

        let adminRole = await Role.findOne({name:"admin"});

        if(!adminRole){
            adminRole = Role.create({name:"admin"});
        }

        const adminUser = await User.findOne({email:"admin@gmail.com"});

          const hashedPwd = await bcryptjs.hash("admin@123",10)

        if(!adminUser){
            await User.create({name:"admin",email:"admin@gmail.com",password:hashedPwd,role:[adminRole._id]});
        }

        console.log("Database connected");


    }catch(error){
      console.log(error);
      process.exit(1);
    }
}

module.exports = connectDB