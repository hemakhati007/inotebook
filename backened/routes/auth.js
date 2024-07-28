const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
//import bcryptjs
const bcrypt = require("bcryptjs");

//import JWT
const jwt = require("jsonwebtoken");

//create you signature --a secret
const JWT_SECRET = "iamagood$girl";

const fetchuser = require("../middleware/fetchuser");

//no login required //creating a user or adding
//CREATE A USER USING: POST "/api/auth/"

//POST END POINT ROUTE:1
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "enter valid email").isEmail(),
    body("password", "password at least of 8 charcaters").isLength({ min: 8 }),
  ],
  async (req, res) => {
    //if there  are errors ,return  Bad request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //creating the instance of User model ,each instance is the object in users collection in iNotepad

    //check wheather the user with this email already exists
    try {
      let user = await User.findOne({ email: req.body.email }); //its a promise
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry user with  this email exist" });
      }

      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt); //returns promise

      //create user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      //       .then((user) => res.json(user))
      //       .cath(
      //         (err) => console.log(err),
      //         res.json({ error: "please enter a unique value" })
      //       );

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      //    res.json({authtoken:authtoken})
      res.json({ authtoken }); //works fine
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//LOGIN END POINT ROUTE:2

//Authenticate  a user using: POST:"/api/auth/login".  no login required
router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with corect credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(payload, JWT_SECRET);
      res.json({ authtoken, msg: "logined" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("internal server  error occured");
    }
  }
);


//Route:3  get logined user detatil  using "/api/auth/getuser"  login required

router.post(
  "/getuser",fetchuser,async(req,res)=>
  {
    try {
       userId=req.user.id;
      const user=await User.findById(userId).select("-password")  
      res.send(user)  

 } catch (error) {
  console.error(error.message);
    res.status(500).send("internal server  error occured"); 
 }

  }
)

  
 

module.exports = router;
