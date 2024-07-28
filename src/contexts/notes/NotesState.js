import React, { useState } from "react";

import NoteContext from "./NoteContext";


// this will provide states
const NoteState=(props)=>{

    const s1={
        "name":"harry",
        "class":"5b" 
    };
    const [state,setState]=useState(s1);
     const  update=()=>{
        setTimeout(()=>{
            setState({
                "name":"larry",
                "class":"10b"
            })
        })
    }
   return (
    <NoteContext.Provider value={{state,update}} >
        {props.children}
    </NoteContext.Provider>
   )

}


export default NoteState;