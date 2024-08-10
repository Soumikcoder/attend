import React, { useCallback, useEffect, useRef, useState } from 'react';
import './CardList.css'
import { CardContext, useCard } from '../context';
function CardList({cardcomp}) {
	const {req_percentage,editCard,deleteCard}=useCard()
	const [percen,setPercen]=useState(75)
	const [quote,setQuote]=useState("")
	const [editable,setEditable]=useState(false)
	const [present,setPresent]=useState(cardcomp.present)
	const [total,setTotal]=useState(cardcomp.total)
	const edit=()=>{
		editCard(cardcomp.id,{...cardcomp,
        	present,
        	total
        })
	}
	const getQuote=useCallback( ()=>{
		if(req_percentage== 100 ) {
			if(percen == req_percentage) return "You have to attend all class"
			else
				return "You never gonna get on track"
		}
		if(percen >= req_percentage){
	    		const noOfLeaves=Math.floor((100*present-req_percentage*total)/req_percentage);
	    		if(noOfLeaves == 1){
	    			return `You may Leave next class.`;
	    		}
	    		else if(noOfLeaves > 0){
	    			return `You may Leave next ${noOfLeaves} classes.`;
	    		}
	    		else{
	    			return`You're right on track.`;
	    		}
	    	}
	    	else{
	    		const noOfAttend=Math.floor((req_percentage*total-100*present)/(100-req_percentage));
	    		if(noOfAttend <= 1){
	    			return `You have to attend next class.`;
	    		}
	    		else{
	    			return `You have to attend next ${noOfAttend} classes.`;
	    		}
	    	}
	},[req_percentage,percen])
	useEffect(()=>{
		const cal_percentage=(parseInt(total) != 0?parseInt(present)/parseInt(total)*100:100)
		setPercen(cal_percentage.toFixed(0))
		const new_quote=getQuote()
		setQuote(new_quote)
	},[present,total,getQuote])


   return(
   	<div className='card'>
	   	<div className="progress-bar" style={{
	   		"--bgcolor" : (percen>=req_percentage ? 'limegreen':'red')
	   	}} >
	        <div className="progress" >
	            {percen}
	        </div>
	   	</div>
	    <span className="subject-name">
	    {cardcomp.name}
	    </span>
	    <span className="Attendance">
	    	<input type="text" className="present" value={present}
	    	onChange={(e)=>setPresent((e.target.value))}
	    	readOnly={!editable} />
	    	/
	    	<input type ="text" className="total" value={total
	    } onChange={(e)=>setTotal((e.target.value))} readOnly={!editable} />
	    </span>
        <button id="present" onClick={()=>{
        	setPresent((prev)=>prev+1)
        	setTotal((prev)=>prev+1)
        	edit()
        }
    	}>&#x2713;</button>
        <button id="absent" onClick={()=>{
        setTotal((prev)=>prev+1)
        edit()
        }}
        >❌️</button>
        <button id="edit" onClick={()=>{
        	if(editable){
        		setPresent(parseInt(present))
        		setTotal(parseInt(total))
        		edit()
        	}
        	setEditable((prev)=>!prev)
        	return;
        }
       	}>{!editable?'✍️':'📋️'}</button>
        <button id="del" onClick={()=>{deleteCard(cardcomp.id)}}>-</button>
       	<div className="quote">
       		{quote}
       	</div>
     </div>
   )
}

export default CardList;