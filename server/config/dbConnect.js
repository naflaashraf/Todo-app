const mongoose = require('mongoose')

const dbConnect = async(req,res)=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/TodoProject')
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

dbConnect()