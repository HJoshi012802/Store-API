require('dotenv').config()

const connectDB = require('./db/connect');
const Product =require('./models/product');

const jsonProducts =require('./products.json')

const start =async()=>{
    try{
        await connectDB();
        await Product.deleteMany();  //not compulsory but is to make sure we delete the data before  we start writting new one which in this case is actually not present
        await Product.create(jsonProducts)
        console.log('Success!!!')
        process.exit(0)
    }catch (error){
        console.log(error);
        process.exit(1)
    }
}

start();