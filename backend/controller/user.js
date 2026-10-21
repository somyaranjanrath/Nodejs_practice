import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const signup = async(req,res)=>{
    try{
        const {username,email,password} = req.body
        const hashpassword=await bcrypt.hash(password,6)
        const user=await User.create({username,email,password:hashpassword})
        res.status(201).json({message:"signup successfully", user})

        
    }catch(error){
        console.log(error)
        res.status(500).json({error:error.message})
    }
}

export const login = async(req,res)=>{
   try{
        const {email,password} = req.body
        const user=await User.findOne({email})
        if(!user || !(await bcrypt.compare(password,user.password))){
            res.status(401).json({error:"invalid credentials"})
        }
        const token =jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET
        )

        res.status(201).json({message:"login successfully", token})

        
    }catch(error){
        console.log(error)
        res.status(500).json({error:error.message})
    }
}