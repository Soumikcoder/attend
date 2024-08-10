import React, { useState } from 'react';
import { useCard } from '../context';
import './InputField.css'
function InputField() {
   const {addCard}=useCard()
   const [text,setText]=useState("")
   const add=()=>{
      const status=addCard(text)
      setText("")
   }
   return(
   <div className='InputField' style={{textAlign:'center'}}>
         <input type="text" value={text} placeholder="Add a Subject" onChange={(e)=>setText(e.target.value)}/>
         <button id="btn" onClick={add}>+</button>
   </div>
   )
}

export default InputField;