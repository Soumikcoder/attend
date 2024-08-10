import React, { useState } from 'react';

function Help() {
   const [isOpen,setIsOpen]=useState(false)
   const togglePopup = () => {
      setIsOpen((prev)=>!prev)
   };
   const popup_style={
    transform:
    (!isOpen?'translate(-50%,-50%) scale(0.0)':'translate(-50%,-50%) scale(1.0)'),
   transition: '0.2s'
    };
   return(
   <>
      <button id="help" onClick={togglePopup}>&#10067;</button>
       <div className="help popup" style={popup_style}>
          <button onClick={togglePopup}>&#10005;</button>
          <ul>
             <li>
                 <span style={{background: "green"}}>&#x2713;</span> Mark Present
             </li>
             <li>
                 <span style={{background: "red"}}>&#x2717;</span> Mark Absent
             </li>
             <li>
                 <span style={{background:" orange"}}>&#9998;</span> Modify Attendance
             </li>
             <li>
                 <span style={{background:" green"}}>&#9998;</span> Edit Mode
             </li>
             <li>
                 <span style={{background:"#0064ff"}}>-</span>Delete Subject
             </li>
          </ul>
      </div>
   </>
   )
}

export default Help;