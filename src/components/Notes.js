import React, { useContext, useEffect, useState,useRef } from "react";
import NoteContext from "../contexts/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);

  // const updatenote=(note)=>{
  //   ref.current.click
  // }

   const ref=useRef(null);
 

  return (
    <>
      <AddNote/>

    
{/* 
      <button type="button" class="btn btn-primary" data-bs-toggle="modal"  ref={ref}data-bs-target="#exampleModal">
  Launch demo modal
</button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT NOTE</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" >Save changes</button>
            </div>
          </div>
        </div>
      </div> */}





      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          // return <Noteitem key={note_id}  updatenote={updatenote} note={note} />;
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
      
    </> 
  );
};

export default Notes;
