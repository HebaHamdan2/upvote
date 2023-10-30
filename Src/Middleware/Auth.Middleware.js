import jwt from 'jsonwebtoken'
import userModel from '../../DB/Models/User.model.js';
import { asyncHandler } from './errorHandling.js';
export const auth=asyncHandler( async(req,res,next)=>{

    const{authorization}=req.headers;
  
    if(!authorization?.startsWith(process.env.BEARERTOKEN)){
        return res.json({message:"Invalid authorization"});
    }
  const token= authorization.split(process.env.BEARERTOKEN)[1];
    if(!token){
        return res.json({message:"Invalid authorization"});
    }
    const decoded = jwt.verify(token,process.env.LOGINSIGNATURE);
    const authUser= await userModel.findById(decoded.id).select("userName email");
    if(!authUser){
        return res.json({message:"not register account"});
    }
        req.user=authUser;
    next();
})