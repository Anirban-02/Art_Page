import { act } from "react-dom/test-utils";
import PictureData from "../Components/PictureData.json";
const ProductReducer=(state,action)=>{
    switch (action.type) {
        case "Filter_Category":

            const fildata=PictureData.filter((currElem)=>
            {
                if(action.payload==='All'){
                    return currElem;
                  }
                  else{
                    return currElem.category === action.payload
                  }
            });
            
            return{
                ...state, 
                data1:fildata,
                currentPage:1,
                click:false,
                category:action.payload,
                npage:Math.ceil(fildata.length / state.artperpage),
                numbers:[...Array(Math.ceil(fildata.length / state.artperpage)+1).keys()].slice(1),
                lastindex : 1 * state.artperpage,
                firstindex : state.lastindex - state.artperpage
            };
        case "Page_Change":
            var cpage=0;
            cpage=state.currentPage+action.payload;
            return{
                ...state,
                currentPage : cpage,
                lastindex : cpage * state.artperpage,
                firstindex : (cpage * state.artperpage) - state.artperpage
                
            };    
        case "Page_Jump":
            var jpage=0;
            jpage=action.payload;
            return{
                ...state,
                currentPage : jpage,
                lastindex : jpage * state.artperpage,
                firstindex : (jpage * state.artperpage) - state.artperpage
            };
        case "Filter_Tag" :
            
            return {
                ...state
            };
        case "Set_Click":
            const changeclick=!state.click;
            return{
                ...state,
                click: changeclick,
            };
        
        
    }
};
export default ProductReducer;
