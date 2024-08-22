import React, { useContext, useEffect,useState, useRef } from "react";
import NoteContext from "../contexts/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

const Notes = ({showAlert}) => {
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  const navigate= useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/Login")
    }
   
  }, [getNotes,navigate]);
  const[note,setNote]=useState({ id:"",etitle:"", edescription:"", etag:"default"})

  //function for opening the update form
  const updateNote = (currentNote) => {
   
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
   
  }
  
  //function to write on form inputs
  const onChange=(e)=>
    {
      // e.preventDefault();
       setNote({...note,[e.target.name]:e.target.value})
    }


//function to do updation on server
    const handleClick=(e)=>{
      e.preventDefault();
      refClose.current.click();
      editNote(note.id,note.etitle,note.edescription,note.etag);
           
        console.log("updating note",note); 
        showAlert("updated successfully","success");
    }

  const ref = useRef(null);
  const refClose = useRef(null);




  return (
    <>
      <AddNote showAlert={showAlert} />


      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* another form similar to addnote */}
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                <label htmlFor="edescription">Description</label>
                  <input   type="text" className="form-control" id="edescription" value={note.edescription} name="edescription"onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag">Tag</label>
                  <input type="text"className="form-control"id="etag"name="etag"  value={note.etag} onChange={onChange} />
                </div>

              </form>


            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button"  className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
         <div className="container mx-1">
        {notes.length===0 && 'no notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert}/>;
          // return <Noteitem key={note._id} note={note} />;
        })}
      </div>

    </>
  );
};

export default Notes;
