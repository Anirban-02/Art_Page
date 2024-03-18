const express=require("express");
const mongoose=require("mongoose");
const multer=require('multer');
const nodemailer=require('nodemailer');
const Mailgen=require('mailgen');
const cors=require('cors');
require('dotenv').config()
const Email=process.env.Email;
const Password=process.env.Password;
const app=express();
const port=process.env.PORT||5000;
app.use(express.json());
app.use(cors(
    {
        origin:"https://art-page-front.vercel.app",
        methods:["POST","GET"],
        credentials:true
    }
));
mongoose.connect(process.env.Mongo_url).then(()=>console.log("Connected to Database"))
.catch((err)=>console.log("Database Not Connected"));

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'../frontend/public/orderedImages')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});
const upload=multer({ 
    storage:storage
});

const mySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true },
    email:{
         type:String, 
         required:true,    
        },
    address:{
        type:String,
        required:true},
    number:{
        type:Number,
        required:true,
        min:10
    },
    size:{
        type:String,
        required:true
    },
    medium:{
        type:String,
        required:true
    },
    orderImage : {
        type:String,
        required :true
    }
    }
 );
 const Mymodel=new mongoose.model("artTest1",mySchema);

 //posting data in database and sending email to the user.
 app.post('/data',upload.single("orderImage"),async(req,res)=>{
    const{name,email,address,number,size,medium,amount}=req.body;
    console.log("usermail : ",email)
    let config={
        service:'gmail',
        auth:{
            user:Email,
            pass:Password
        }
    }
    let transporter=nodemailer.createTransport(config);
    let MailGenerator=new Mailgen(
        {
            theme:"salted",
            product : {
                name:"Awesome Arts",
                link:'https://mailgen.js/'
            }
        }
    )
    let text = name;
    const myArray = text.split(" ");
    let first_name = myArray[0];
    let response={
        body:{
            name:first_name,
            intro:"Your Order has been Successfully Placed!",
            table:{
                data: [
                {
                    Item_Ordered : "Commissioned Artwork",
                    Medium:medium,
                    Size:size,
                    price:amount
                }
                ]
            },
            outro:"Thanks for Placing the Order."
        }
    }
    let mail=MailGenerator.generate(response);
    let message={
        from:Email,
        to:email,
        subject:"Order Placed",
        html:mail
    }

    const orderImage=req.file.path;
    if(name===''|| email===''|| address===''|| orderImage=='' || number===''|| size===''|| medium==='')
    {
        res.status(422).json({ error :"Plz fill the field properly"});
    }
    else{
    try{
        const data=new Mymodel({name,email,address,number,size,medium,orderImage});
        data.save().then(()=>console.log("Order Placed")).catch((e)=>console.log(e));
        transporter.sendMail(message);
        res.status(201).json({message:"Order Successful"})   
    }
    catch(e)
    {
        console.log(e);
    }
    }
   }).listen(port,()=>{
    console.log(`Connection successful running at port ${port}`);
});
