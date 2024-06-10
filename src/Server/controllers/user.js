import {User} from '../models/user.js'
const login=(req,res)=>{
    res.send("Hello World");
}
const register=async(req,res)=>{
    const avatar={
        public_id:"",
        url:"",
    }
    await User.create({
        name:"",
        username:"",
        password:"",
        avatar
        
    })
    res.status(201).json({message:"User created successfully"});
}
export {login, register};
