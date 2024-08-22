import React, { useContext,useState } from "react";
import NoteContext from "../contexts/notes/NoteContext";
const AddNote = ({showAlert}) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const[note,setNote]=useState({title:"", description:"", tag:""})

  const handleClick=(e)=>{
    e.preventDefault();
         addNote(note.title,note.description,note.tag);
          
        setNote({title:"", description:"", tag:""});
        showAlert("note added successfully","success")
  }

  //edit note
  const onChange=(e)=>
  {
    // e.preventDefault();
     setNote({...note,[e.target.name]:e.target.value})
  }

  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <div className="mb-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
             onChange={onChange}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"value={note.description}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"value={note.tag}
              onChange={onChange}
            />
          </div>
          
          
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
