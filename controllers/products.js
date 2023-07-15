const Product =require('../models/product')

const  getAllProductsStatic= async(req,res)=>{
   // throw new Error('Testing New Async Errors ')           //didn't use try catch because of express-async-errors handles everything 
   const products = await Product.find({price:{$gt:100}})   //.sort('name') //.select('name') .limit(10) .skip(1) // .select(" name price")  //.sort('name,price')
    res.status(200).json({products,nbHits:products.length})
}

const  getAllProducts= async(req,res)=>{
    //console.log(req.query)
    const {featured,company,name,sort,field,numericFilters}= req.query          //fields is only defined by and should be                //pulling out value we want to define 
    const queryObject={}                                 //will give all values if featureed is not present 

    if (featured){
        queryObject.featured=featured==='true'?true:false
    }

    if(company){
        queryObject.company=company
    }

    if(name){
        queryObject.name={$regex:name ,$options:'i'}                    //$regex Selects documents where values match a specified regular expression.
    }                //$options:'i' for case insensitivity

    if(numericFilters){
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regular =/\b(<|>|>=|=|<|<=)\b/g            //regular Expression 
        let filters= numericFilters.replace(
            regular,(match)=>`-${operatorMap[match]}-`)
       
          const options=['price','rating'];
          filters=filters.split(',').forEach((item)=>{
            const [field,operator,value]=item.split('-')
            if(options.includes(field)){
                queryObject[field]={[operator]:Number(value)}
            }
          })

    }
    console.log(queryObject)
    let result = Product.find(queryObject)

    //sort
    if (sort){
    
        const sortList = sort.split(',').join(' ');
        result =result.sort(sortList)
    }else{
       result =result.sort('createAt')
    }

    //field
    if(field){
        const fieldList = field.split(',').join(' ');
        result =result.select(fieldList)
    }
    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 10
    const skip =(page-1)*limit;

    result =result.skip(skip).limit(limit)

    const products =await result;
    res.status(200).json({products,nbHits:products.length})
}

module.exports={getAllProductsStatic,getAllProducts}