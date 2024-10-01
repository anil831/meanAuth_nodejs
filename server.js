const express = require('express');
const cors  = require('cors');
const bodyParser = require('body-parser');

const connectDB = require("./config/db")
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();


const app = express();
connectDB();


var whitelist = ['http://localhost:4200', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials:true
}
app.use(cors(corsOptions));
// app.use(cors());

//The cookie-parser middleware is commonly used in Node.js applications to parse cookies from the incoming requests and convert them into a JavaScript object, making it easier to access cookie values.
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.use("/api",require("./routes/routes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT,() => console.log("server is up"));


