import React from 'react'
import Navbar from './Navbar';
import { useState,useContext} from 'react';
import '../Css/Gallery.css';
import { AppContext } from '../context/productcontext';
import Popup from './Popup';
function Gallerynew() {
    const { state,dispatch } = useContext(AppContext);
    const [poptrigger,setpoptrigger]=useState(false);
    const [imgdata,setimgdata]=useState([]);
    function pop(elem1)
    {
      setpoptrigger(true);
      setimgdata(elem1);
    }
    const handleClick=()=>{
      dispatch({type:"Set_Click"})
    }
    const filterItem=(piccat)=>{
        dispatch({type:"Filter_Category",payload:piccat})
    }
    function goPrevPage(){
        if (state.currentPage!=1)
            dispatch({type:"Page_Change",payload:-1})
      }
    function goNextPage(){
        if (state.currentPage!=state.npage)
            dispatch({type:"Page_Change",payload:1})
      }
    function changeCurrentPage(currpage){
        dispatch({type:"Page_Jump",payload:currpage})
      }
    function type(category)
    {
      if (category ==="For Sale")
      {
        return "Buy"
      }
      else
        return "See"
    }
    return (
        <>
            <Navbar/>
            <div className="Filter-Search-div">
              <div className="Search-by-category">
                <h3>Search by Category</h3>
                <i className={state.click ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-circle-chevron-down'} onClick={handleClick}></i>
              </div>
              <div className={state.click ? "Filter-Search-Active" :"Filter-Search"}>
                <div className="menu">
                <h6 onClick={() => filterItem("All")}>
                    <button>All</button>
                  </h6>
                  <h6 onClick={() => filterItem("Commissioned")}>
                    <button>Commissioned</button>
                  </h6>
                  <h6 onClick={() => filterItem("Gifts")}>
                    <button>Gifts</button>
                  </h6>
                  <h6 onClick={() => filterItem("For Sale")}>
                    <button>For Sale</button>
                  </h6>
                </div> 
                <h3>Showing results for : {state.category}</h3>   
              </div>
              
            </div>
            
              <div className="row">
                {state.data1.slice(state.firstindex,state.lastindex).map((elem1) => {
                  const { img1, name, desc,category,price,date,sold } = elem1;
                  return (
                    <>
                    <div className="col-lg-4 col-md-6 col-sm-6 box">
                      <div className="box-content" onClick={()=>pop(elem1)} >
                          <img
                            class="card-img-top"
                            src={img1}
                            alt="..."
                          ></img>
                        <div className="card-body">
                          <div className="card-text">
                            <button className='card-button' onClick={()=>pop(elem1)} >{type(category)}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Popup trigger={poptrigger} setTrigger={setpoptrigger} data={imgdata}></Popup>
                    </>
                    
                  );
                })}
              </div>
              <div className='pagination'>
                <a onClick={goPrevPage}>
                  Prev
                </a>
                {
                  state.numbers.map((n,i)=>(
                    <a  key={i} onClick={()=>changeCurrentPage(n)}>{n}</a>
                  ))
                }
                <a onClick={goNextPage}>
                  Next
                </a>
              </div>
        </>
      )
    }
export default Gallerynew
