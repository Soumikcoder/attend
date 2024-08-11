import React, { useState } from 'react';
import { useCard } from '../context';
import './InputField.css'
function InputField() {
   const {addCard}=useCard()
   const [text,setText]=useState("")
   const [color,setcolor]=useState('aqua')
   const add=()=>{
      const status=addCard(text)
      if(status) setcolor('limegreen')
         else setcolor('red')
      console.log(color)
      setText("")
   }
   return(
   <div className='InputField' style={{textAlign:'center'}}>
         <input type="text" value={text} style={{boxShadow:` 0 0 4px ${color}`}}
          placeholder="Add a Subject" onChange={(e)=>setText(e.target.value)}/>
         <button id="btn" onClick={add}>+</button>
   </div>
   )
}

export default InputField;