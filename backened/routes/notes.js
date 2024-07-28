const express=require('express');
const router=express.Router();
const fetchuser = require("../middleware/fetchuser");//for accessing data of only logined user using token

const Notes = require("../models/Notes");


//Route 1: Get all the notes using :GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes',fetchuser, async(req,res)=>{

    const notes=await Notes.find({user:req.user.id});
 
    res.json(notes)

 
})

module.exports= router;