import React, { useState } from 'react';
import { useCard } from '../context';
import './InputField.css'
import DOMPurify from 'dompurify';

function InputField() {
   const {addCard}=useCard()
   const [text,setText]=useState("")
   const [color,setcolor]=useState('aqua')
   const add=()=>{
      const purified_text=DOMPurify.sanitize(text)
      const status=addCard(purified_text)
      if(status) setcolor('limegreen')
         else setcolor('red')
      setText("")
   }
   return(
   <div className='InputField' style={{textAlign:'center'}}>
         <input type="text" value={text} style={{boxShadow:` 0 0 4px ${color}`}}
          placeholder="Add a Subject" onChange={(e)=>setText(e.target.value)}
          onKeyPress={(e)=>{
            if (e.key === 'Enter' || e.keyCode === 13) add();
            }
          } autoFocus={true}
          />
         <button id="btn" onClick={add}>+</button>
   </div>
   )
}

export default InputField;