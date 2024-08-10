import { createContext, useContext } from "react";


export const CardContext=createContext({
	req_percentage:75,
	changePercentage:(req_percentage)=>{},
	cards:[{
		id:1,
		present:1,
		total:2,
		subname:"Bengali"
	}],
	addCard:(subname)=>{},
	editCard:(id,card)=>{},
	deleteCard:(id)=>{}
})



export const CardProvider=CardContext.Provider

export const useCard=()=>{
	return useContext(CardContext)
}
