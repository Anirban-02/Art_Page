import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../Css/Buy.css'
function Buy() {
    const navigate=useNavigate();
    const [user,setUser]=useState({name:"",email:"",address:"",number:"",orderImage:"",size:"",medium:""});
    const [Price,setPrice]=useState(0);
    const [MedPrice,setMedPrice]=useState(0);
    let name,value;
    const handleInputs=(e)=>{
        name=e.target.name;
        if (name==='orderImage')
            value=e.target.files[0]
        else
            value=e.target.value;
        if (name==='size')
        {
            switch(value){
                case "A3":
                    setPrice(500);
                    break;
                case "A4":
                    setPrice(400);
                    break;
                case "A5":
                    setPrice(300);
                    break;
            }
        }
        if (name==='medium')
        {
            switch(value){
                case "Graphite (B/W)":
                    setMedPrice(100);
                    break;
                case "Coloured (Water/pencil)":
                    setMedPrice(200);
                    break;
                case "Dot Painting":
                    setMedPrice(150);
                    break;
                case "Mixed Medium":
                    setMedPrice(200);
                    break;
            }
        }

        setUser({...user,[name]:value});
    }
    axios.defaults.withCredentials=true;
    const PostData =async(e)=>{
        e.preventDefault();
        const{name,email,address,number,size,medium,orderImage}=user;
        const amount=Price+MedPrice;
        try {
            const res = await axios.post("https://art-page-omega.vercel.app/data",
        {
            name,email,address,number,size,medium,orderImage,amount,
        },
        {
            headers:{'Content-Type':'multipart/form-data'}
        });
        if(res.status === 422 || !res.data)
        {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
            navigate("/buy");
        }
        else{
            window.alert("Order Successful \nYou received an email.");
            console.log("Order Successful");
            navigate("/");
        }
            
        } catch (error) {
            console.log(error)
            
        }
        
        
    }
  return (
    <>
    <Navbar/>
    <div className="buyrow">
        <div className="left">
            <h1>Place Order</h1>
            <form onSubmit={PostData} encType='multipart/form-data'>
                <div className="form-group">
                    <label className='label-field'>Enter Name : </label>
                    <input type='text' name='name' required='true' placeholder='Name' autoComplete='off' value={user.name} onChange={handleInputs} ></input>
                </div>
                <div className="form-group">
                    <label className='label-field'>Email-Address : </label>
                    <input type='email' name='email' required='true' placeholder='Email' autoComplete='off' value={user.email} onChange={handleInputs} ></input>
                </div>
                <div className="form-group">
                    <label className='label-field'>Address : </label>
                    <input type='text' name='address' required='true' placeholder='Address' autoComplete='off' value={user.address} onChange={handleInputs}></input>
                </div>
                <div className="form-group">
                    <label className='label-field'>Phone Number : </label>
                    <input type='text' name='number' required='true' placeholder='Phone Number' autoComplete='off' value={user.number} onChange={handleInputs}></input>
                </div>
                
                <div class="form-group">
                    <label className='label-field'>Select Desired Size :</label>
                    <select class="select" name='size' required='true' value={user.size} onChange={handleInputs}>
                      <option value="" selected="true" hidden disabled>Select a size</option>
                      <option value="A3">A3</option>
                      <option value="A4">A4</option>
                      <option value="A5">A5</option>
                    </select>
                </div> 
                <div class="form-group">
                    <label className='label-field'>Select Medium :</label>
                    <select class="select" name='medium' required='true' value={user.medium} onChange={handleInputs}>
                      <option value="" selected="true" disabled hidden>Select a Medium</option>
                      <option value="Graphite (B/W)">Graphite (B/W)</option>
                      <option value="Coloured (Water/pencil)">Coloured (Water/pencil)</option>
                      <option value="Dot Painting">Dot Painting</option>
                      <option value="Mixed Medium">Mixed Medium</option>
                    </select>
                </div> 
                <div className="form-group">
                    <label className='label-field'>Upload an Image: </label>
                    <input type='file' required='true' name='orderImage' onChange={handleInputs}></input>
                </div>
                <div >
                    <span>Amount : </span>
                    <input className='Price' value={Price+MedPrice} ></input>
                </div>
                <div className='button'>
                <button type="submit" className='order-button' >Order</button>
                </div>
                
            </form>
        </div>
        
    </div>
    </>
    
  )
}

export default Buy;
