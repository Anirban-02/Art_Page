import React from 'react';
import '../Css/Popup.css';
const Popup = (item) => {
  var img = document.createElement("img");
  img.src=item.data.img1;
  return (
    (item.trigger)?
    (
    <div className='popup'>
        <div className='popup-in'>
          <div className="col-lg-6 col-12 popup-in-left">
            <img id={(img.height > img.width)?"verticalpic":"horizontalpic"} src={item.data.img1} ></img>
          </div>
          <div className="col-lg-6 col-9 popup-in-right">
            <p id='right-title'>Details </p>
            <p> Title : {(item.data.category!='Commissioned')?(item.data.name):("Commissioned Work")} </p>
            <p>Medium Used : {item.data.medium} </p>
            <p> Category : {item.data.category} </p>
            {(item.data.category==='Commissioned')?(<p> Date of Order : {item.data.date}</p>):(<p> Date of Completion : {item.data.date}</p>)}
            <p>Duration : {item.data.duration}</p>
            <p>Size : {item.data.size}</p>
            {(item.data.sold==="NA")?(<p>Not for Sale</p>):((item.data.sold==='No')?(<button>ORDER NOW</button>):(<p>Sold</p>))}
          </div>
          
          <i className='fa-solid fa-circle-xmark ' id="iconx" onClick={()=>item.setTrigger(false)}></i>

        </div>
        
    </div>
    ):""
    
  )
}

export default Popup;
