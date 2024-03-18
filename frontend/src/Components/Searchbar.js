import React, { useContext, useState } from 'react';
import PictureData from './PictureData.json';
import "../Css/Searchbar.css"
import { AppContext } from '../context/productcontext';

const Searchbar = () => {
    const{dispatch}=useContext(AppContext);
    const[filteredData,setFilteredData]=useState([]);
    const tag=[];
    PictureData.map((item)=>{
        item.tags.map((ele)=>{
            if (!(tag.includes(ele)))
                tag.push(ele)
        });
    })
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        const newFilter = tag.filter((value)=>{ 
            return value.toLowerCase().includes(searchWord.toLowerCase())
            });
        
        if(searchWord==='')
            setFilteredData([])
        else
            setFilteredData(newFilter);
    };
    const deleteInput=()=>{
        setFilteredData([])
    }
    
    return (
    <div className='search-main'>
        <div className='search-bar'>
            <input type='text' id='searchbox' placeholder='Search a Painting' onChange={handleFilter}></input>
            <i className={filteredData.length===0 ? "fa-solid fa-magnifying-glass searchIcon but" : "fa-solid fa-xmark but"} onClick={deleteInput}></i>
        </div>
            { filteredData.length!==0 && (
            <div className="dataResult">
                {filteredData.slice(0,8).map((elem)=>{
                    return(
                    <div className='options'>
                        <p >{elem}</p>
                    </div>
                    )
                })}
            </div>
            )
            }
    </div>
  )
}

export default Searchbar
