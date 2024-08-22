import React, { useContext } from "react";
import NoteContext from "../contexts/notes/NoteContext";

const Noteitem = (props) => {
  const { note ,updateNote,showAlert } = props;
  const context = useContext(NoteContext);
  const { deleteNote} = context;

  return (
    <div className="col-md-3">  
    
   
      <div className="card my-3" >
      
        <div className="card-body">
            <div className="d-flex align-items-centerr">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash-can mx-2" style={{color:"#74C0FC"}} onClick={()=>{deleteNote(note._id);showAlert("deleted successfully","success")}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)} style={{color: "#74C0FC"}}></i>
          
            </div>
          <p className="card-text">
          {note.description} 
          </p>
        
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
