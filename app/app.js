const express = require('express');
const cors = require('cors');
const userRouter = require('../router/userRouter');
const app = express();
const {connect} = require('../db/db');

// use middleware to form our contract for incoming json payloads ONLY!!
app.use(express.json());
// use middleware for url encoding
app.use(express.urlencoded({extended: true }));
// use middleware to handle cors policy.
app.use(cors());
// app.use((req,res, next)=>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Content-Type, Accept, Authorization, Origin, X-Requested-With'
//     );
//     if ( req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET')
//     }
//     next(); //go to the next middleware
// })

//health point or actuator
app.get("/", (req, res, next) => {
    res.status(200).json({message: "Service is up"});
})

//routers 
app.use("/users", userRouter);


// handling bad url with middleware
app.use((req, res, next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req,res,next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    });
})

connect();
module.exports = app;