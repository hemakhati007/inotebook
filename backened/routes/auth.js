const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');

const User=require('../models/User');

router.post('/',
    [
        body("name","Enter a valid name").isLength({min:3}),
        body('email',"enter valid email").isEmail(),
        body('password','password at least of 8 charcaters').isLength({min:8}),
    ],(req,res)=>{
    const errors = validationResult(req);
   if (!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() });
     }

     User.create({
     name: req.body.name,
      password: req.body.password,
    email: req.body.email,
    }).then(user => res.json(user));
   
})

//CREATE A USER USING: POST "/api/auth/" 

module.exports= router;