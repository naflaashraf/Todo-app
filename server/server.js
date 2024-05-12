const express = require('express')
const usersRoute = require('./routes/user/userRoute')
const projectRoute = require('./routes/project/projectRoute') 
const todosRoute = require('./routes/todo/todoRoute');
const cors = require('cors')
const app = express()
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('./config/dbConnect')
app.use(session({
    secret: 'anykey',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:60*60*1000
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost:27017/TodoProject'
    })
}))
//route
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST','DELETE','PUT'], // Specify allowed HTTP methods
    credentials: true // Allow credentials (cookies) to be sent cross-origin
}));
app.use('/api/v1/user',usersRoute)
app.use('/api/v1/project',projectRoute)
app.use('/api/v1', todosRoute)

app.listen(3001,()=>{
    console.log('server connected');
})