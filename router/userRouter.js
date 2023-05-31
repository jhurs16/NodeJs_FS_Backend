const express = require('express');
const router = express.Router();

//route for : http://localhost:3001/users/1
router.get("/", (req, res,next)=>{
    res.status(200).json({
        message: "Successfull - Get",
        metadata: {
            hostname: req.hostname,
            method: req.method
        }
    })
});
//route for : http://localhost:3001/users/12
router.get("/:id", (req, res,next)=>{
    res.status(200).json({
        message: "Successfull - GET by id",
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method
        }
    })
});

router.post("/", (req, res,next)=>{
    const name = req.body.name // payload | { "name": "Jhurs"}
    res.status(200).json({
        message: "Successfull - POST",
        metadata: {
            name: name, // JHurs
            hostname: req.hostname,
            method: req.method
        }
    })
});
module.exports = router;