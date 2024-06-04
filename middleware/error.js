const errorHandler = (error, req, res, next) => {
    if(error.status){
        return res.status(error.status).json({msg: error.message})
    } else {
        return res.status(500).json({msg: error.message})
    }
}

export default errorHandler;