import React, { useEffect } from 'react';
import { useContext } from 'react';
import NoteContext from '../contexts/notes/NoteContext';
const About = () => {
    const a=useContext(NoteContext)

    useEffect(()=>{

       a.update();
    },)
  return (
    <div>
        THIS IS ABOUT  {a.state.name} And he is in {a.state.class}
    </div>
  )
}

export default About
