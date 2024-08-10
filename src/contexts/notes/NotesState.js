import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


import NoteContext from "./NoteContext";

// this will provide states
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  //GET ALL NOTES
  
  const getNotes=async()=>{

     //API CALL
     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application./json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhM2U5MDk4MzFkMzE0NjI0YmJjYzIwIn0sImlhdCI6MTcyMjEzMzc3NX0.2uwBKcwOiAnxoy7USOv-8Wk0e6K-_t-rEcjeVAq_Dnw",
      },
      
    });
    const json=await response.json()
  
   setNotes(json);

  }
  

  //ADD a Note

  const addNote =async (title, description,tag) => {


    //API CALL
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhM2U5MDk4MzFkMzE0NjI0YmJjYzIwIn0sImlhdCI6MTcyMjEzMzc3NX0.2uwBKcwOiAnxoy7USOv-8Wk0e6K-_t-rEcjeVAq_Dnw"
      },
      body: JSON.stringify({title,description,tag}),
     
    });

    const json= await response.json();
    console.log(json);


    console.log("addNote");
    const note = {
      _id: uuidv4(),
      user: "66a3e909831d314624bbcc20",
      title:title,
      description: description,
      tag:tag,
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //DELETE a Note


 

  const deleteNote = async(id) => {
     //API CALL

  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application.json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhM2U5MDk4MzFkMzE0NjI0YmJjYzIwIn0sImlhdCI6MTcyMjEzMzc3NX0.2uwBKcwOiAnxoy7USOv-8Wk0e6K-_t-rEcjeVAq_Dnw",
    },
    
  });

  const json=response.json();
  console.log(json);

    console.log(`deleting note with id ${id}`);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhM2U5MDk4MzFkMzE0NjI0YmJjYzIwIn0sImlhdCI6MTcyMjEzMzc3NX0.2uwBKcwOiAnxoy7USOv-8Wk0e6K-_t-rEcjeVAq_Dnw",
      },
      body: JSON.stringify({title, description, tag}),
    });

    const json = response.JSON();
    console.log(json);

    //LOGIC TO EDIT
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
