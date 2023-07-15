require('dotenv').config()
require('express-async-errors')

const express=require('express')
const app =express()


const connectDB= require('./db/connect')
const productsRouter =require('./routes/products')

const notFoundMiddleware=require('./middleware/not-found');
const errorMiddleware=require('./middleware/error-handler');




//middleware
app.use(express.json())


//routes for manual Testing

app.get('/',(req,res)=>{
    res.send('<h1> STORE API </h1><a href="/api/v1/products">Products routes</a>')
})

app.use('/api/v1/products',productsRouter)  //app.use to specify middleware as the callback function 

//products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)



const port =process.env.PORT || 3000

const start =async()=>{
    try{
        //connectDB
        await connectDB();
     app.listen(port,console.log(`Server is Listening port ${port}...`))
    }catch(error){
       console.log(error);
    }
}

start()