//create a context
//provider
//consumer (useContext Hook)
import {createContext, useReducer,useMemo  } from "react";
import reducer from '../reducer/productreducer'
import PictureData from "../Components/PictureData.json";
const AppContext =createContext();

const initialState={
    data1:PictureData,
    click:false,
    tag:[],
    category:'All',
    artperpage:6,
    currentPage:1,
    npage : 0,
    numbers: [],
    lastindex:0,
    firstindex:0
}
initialState.npage=Math.ceil(initialState.data1.length / initialState.artperpage);
initialState.numbers=[...Array(initialState.npage+1).keys()].slice(1);
initialState.lastindex=initialState.currentPage * initialState.artperpage;
initialState.firstindex=initialState.lastindex-initialState.artperpage; 
const AppProvider =({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState)
    
    const contextValue = useMemo(() => {
        return { state, dispatch };
      }, [state, dispatch]);

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>};

export {AppProvider,AppContext};
