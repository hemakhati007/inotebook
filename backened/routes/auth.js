const express=require('express');
const router=express.Router();

const User=require('../models/User');

router.post('/',(req,res)=>{
    
    console.log(req.body);
     
    const user= new User(req.body);
    user.save();

    res.send('hello');

})

//CREATE A USER USING: POST "/api/auth/" 

module.exports= router;