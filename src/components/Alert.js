import React from 'react'

export default function Alerts({alert}) {
    if (!alert) return null;

    const capitalize=(word)=>{
      if(word==="danger")
      {
        word="Error";
      }
      return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first letter
    }
  return (
   
   
      <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(alert.type)}</strong>  { alert.msg}
                <button type="button"className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
   
  )
}