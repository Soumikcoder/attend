import { useEffect, useState } from 'react'
import './App.css'
import {CardProvider} from './context'
import InputField from './components/InputField.jsx'
import CardList from './components/CardList.jsx'
import Help from './components/Help.jsx'
import Slider from './components/Slider.jsx'
function App() {
  const [req_percentage,setReqPercentage]=useState(75)
  const [cards,setCards]=useState([])

  const addCard=(subname)=>{
    if(subname==="") return
    const card={
      id:btoa(subname),
      name:subname,
      present:0,
      total:0
    }
    for(let i=0;i<cards.length;i++)
      if(cards[i].id === card.id)
        return false
    setCards((prev)=>[...prev,card])
    return true
  }
  const editCard=(id,card)=>{
    setCards((prev)=>(prev.map((prev_card)=> prev_card.id === id ? card : prev_card
    )))
  }

  const deleteCard=(id)=>{
    setCards((prev)=>(prev.filter((card)=>card.id!==id)))
  }
  useEffect(()=>{
    const cards_from_storage=JSON.parse(localStorage.getItem("Attendance"))

    if(cards_from_storage && cards_from_storage.length > 0){
      setCards(cards_from_storage)
    }
    const storage_percentage=JSON.parse(localStorage.getItem("percentage"))
    if(storage_percentage) {
      changePercentage(storage_percentage)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("Attendance",JSON.stringify(cards))
  },[cards])

  const changePercentage=(percentage)=>{
    setReqPercentage(percentage)
    localStorage.setItem("percentage",percentage)
  }

  return (

    <CardProvider value={{req_percentage,changePercentage,cards,addCard,editCard,deleteCard}}>
    <div className='subject'>
      <h1>Attendance Manager</h1>
      <InputField />
      <div className='list'>
      {
        cards.map((card)=>{
          return (<CardList key={card.id} cardcomp={card} />)
        })
      }
      </div>
      </div>
      <Help/>
      <Slider/>
    </CardProvider>
  )
}

export default App
