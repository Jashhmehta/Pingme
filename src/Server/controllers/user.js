import {User} from '../models/user.js'
import { sendToken } from '../utils/features.js';
const login=(req,res)=>{
    res.send("Hello World");
}
const register=async(req,res)=>{
    const {name,username,password }=req.body;

    const avatar={
        public_id:"1",
        url:"xcw",
    }
    const user=await User.create({
        name,
        username,
        password,
        avatar,

        
    })
    sendToken(res,user,201,"User Created");
}
export {login, register};
