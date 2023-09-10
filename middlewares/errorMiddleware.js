const errorResponse = require("../utils/errorResponse");

const errorHandler = (err , req , res , next)=>{
    let error = {...err}  // by doing this we can use err as a variable
    error.message = err.message

    // Mongoose cast error
    if(err.name === 'castError'){
        const message = 'Resources not found'
        error = new errorResponse(message , 404) 
    }
    
    // Duplicate Key error 
    if(err.code === 11000){
        const message = 'Duplicate field value Entered'
        error = new errorResponse(message , 400) 
    }

    // Mongoose Validation 
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map((val)=> val.message)
        error = new errorResponse(message , 400) 
        res.status(error.statusCode || 500).json({
            success : false,
            error : error.message || 'Server Error'
        })
    }
}

module.exports = errorHandler