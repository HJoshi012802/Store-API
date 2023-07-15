const mongoose = require('mongoose')


const connectDB=()=>{
  mongoose.connect("mongodb://localhost:27017/store_api", {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(()=>{
  console.log("connect via MongoDB");
}).catch((err)=>console.log(err));
}

module.exports = connectDB
