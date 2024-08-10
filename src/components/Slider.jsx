import {useState} from 'react';
import { useCard } from '../context';

function Slider() {
   const [isOpen,setIsOpen]=useState(false)
   const togglePopup = () => {
      setIsOpen((prev)=>!prev)
   };
   const popup_style={
    transform:
    (!isOpen?'translate(-50%,-50%) scale(0.0)':'translate(-50%,-50%) scale(1.0)'),
   transition: '0.2s'
    };

    const {req_percentage,changePercentage} =useCard()
   return(
   <>
      <button id="perslider" onClick={togglePopup}>%</button>
      <div className="perslider popup" style={popup_style}>
              <button onClick={togglePopup}>&#10005;</button>
          <div className="slectedval progress" id="slider_text">{req_percentage}</div>
          <input type="range" id="slider" min={0} max={100}
          value={req_percentage}
          onChange={(e=>changePercentage(parseInt(e.target.value)))}/>
      </div>
   </>
   )
}

export default Slider;