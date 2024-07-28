const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser"); //for accessing data of only logined user using token

const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes using :GET "/api/notes/fetchallnotes" //login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server  error occured");
  }
});

//Route 1: Add a new notes using :POST "/api/notes/addnotes"   login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "enter a valid tittle").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 chracters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server  error occured");
    }
  }
);

//ROUTE:3 updatng the existing note :PUT "/api/auth/updatenote"  login required

router.put("/updatenote/:id", fetchuser,[], async (req, res) => {

    try {

        const{title,description,tag}=req.body;

    const newNote={};

    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //find the note to be updated 
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(400).send("Not Found")}

    if(note.user.toString()!==req.user.id){
             
        return res.status(401).send("not allowed");
    }

     note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("internal server  error occured");

    }
  });

//   Route:4 Deleting the node using DELETE:"/api/auth/deletenote"  login required
router.delete("/deletenote/:id", fetchuser,[], async (req, res) => {


   
   try {
    //find the note to be updated 
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(400).send("Not Found")}
//allow deletion if user owns the note
    if(note.user.toString()!==req.user.id){
             
        return res.status(401).send("not allowed");
    }

    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({note:note,ms:"deleted"});
    
   } 
   catch (error) {
    console.error(error.message);
      res.status(500).send("internal server  error occured");
   }
    
  });


module.exports = router;
