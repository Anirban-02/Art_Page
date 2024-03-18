import React from 'react';
import Navbar from './Navbar';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../Css/Gallery.css';
import PictureData from './PictureData.json';

import Popup from './Popup';

function Gallery() {
    const [click,setClick]=useState(false);
    const [data1, setItems1] = useState(PictureData);
    const [tag,settag]=useState("");
    const [poptrigger,setpoptrigger]=useState(false);
    const [imgdata,setimgdata]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const artperpage=6;
    const [npage,setnpage]=useState(Math.ceil(PictureData.length / artperpage));
    const [numbers,setnumbers]=useState([...Array(npage+1).keys()].slice(1));
    const lastindex=currentPage * artperpage;
    const firstindex=lastindex-artperpage; 
    const handleClick = () => setClick(!click);
    
    const filterItem =(PicCat)=>{
      setCurrentPage(1);
      const UpdateItems =PictureData.filter((currElem)=>{
        if(PicCat==='All'){
          return currElem;
        }
        else{
          return currElem.category === PicCat
        }
      });
      setnpage(Math.ceil(UpdateItems.length / artperpage));
      setnumbers([...Array(Math.ceil(UpdateItems.length / artperpage)+1).keys()].slice(1));
      setItems1(UpdateItems)
      setClick(false)
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
    function goPrevPage(){
      if (currentPage!=1)
        setCurrentPage(currentPage-1)
    }
    function goNextPage(){
      if (currentPage!=npage)
        setCurrentPage(currentPage+1)
    }
    function changeCurrentPage(currpage){
      setCurrentPage(currpage)
    
    }
    function pop(elem1)
    {
      setpoptrigger(true);
      setimgdata(elem1);
    }

  //   const postdata=()=>{
  //     const msg="hello";
  //     try {
  //       axios.post('http://localhost:4000/api',msg,
  //     {
  //       headers:{'Content-Type':'text/plain'}
  //   });
        
  //     } catch (error) {
  //       console.log(error);
  //     }
  // }
  // useEffect(()=>{
  //   postdata();
  // },[]);
    
  return (
    <>
        <Navbar/>
        <div className="Filter-Search-div">
          <div className="Search-by-category">
            <h3>Search by Category</h3>
            <i className={click ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-circle-chevron-down'} onClick={handleClick}></i>
          </div>
          <div className={click ? "Filter-Search-Active" :"Filter-Search"}>
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
          </div>
        </div>
        
          <div className="row">
            {data1.slice(firstindex,lastindex).map((elem1) => {
              const { img1, name, desc,category,price,date,sold } = elem1;
              return (
                <>
                <div className="col-lg-4 col-md-6 col-sm-12 box">
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
              numbers.map((n,i)=>(
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

export default Gallery;