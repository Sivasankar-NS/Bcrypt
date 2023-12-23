const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/email')
.then(()=>{
    console.log("DB connected sucessfully");
})
.catch(()=>{
    console.log("DB not connected");
});
const schema = require('./schema')
app.use (express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.post('/signup',async(req,res)=>{
const data = new schema({
    ...req.body,
    Password:bcrypt.hashSync(req.body.Password,10),
});
const {Email} = req.body
const existingUser = await schema.findOne({Email});
if(existingUser){
    return res.json ({error:"Email already exists"})
}
await data.save()
res.json(data);
})
app.post('/login',async(req,res)=>{
    const {Email, Password} = req.body;
    //Find user by email
    const user = await schema.findOne({Email});
    if(!user){
        return res.json({message:'Invaild Email'})
    }
    //Check Password - make sure the password is correct  before checking
    const passwordMatch = await bcrypt.compare(Password,user.Password);
    console.log(Password,user.Password);
    if(!passwordMatch){
        return res.json ({message:'Invalid Password'})
    }
    res.json({message:'Login Sucessfully',user})
});

port = 6000
app.listen(port,()=>{
    console.log(`server listening on ${port}`);
})