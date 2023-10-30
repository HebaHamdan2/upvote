import userModel from "../../../../DB/Models/User.model.js";
import { asyncHandler } from "../../../Middleware/errorHandling.js";
import coludinary from "../../../Services/coludinary.js";
import bcrypt from 'bcryptjs';
export const profile= asyncHandler(async(req,res,next)=>{
const {secure_url,public_id}=await coludinary.uploader.upload(req.file.path,{
    folder:`${process.env.APP_NAME}/user/${req.user._id}/profile`
})
if(!req.file){
    return next(new Error("please provide a file"))
}
const user =await userModel.findByIdAndUpdate(req.user._id,{profilePic:{secure_url,public_id}},{new:false});
if(user.profilePic){
    await coludinary.uploader.destroy(user.profilePic.public_id);
}

return res.json({message:user});
})
export const coverPic=asyncHandler(async(req,res,next)=>{
    if(!req.files){
        return next(new Error("please provide a file"))
    }
    
   const coverPic=[];
   for (const file of req.files) {
    coverPic.push(file.dest);

   }
   const user=await userModel.findByIdAndUpdate(req.user._id,{cover:coverPic},{new:true});
   return res.status(200).json({message:"success",user});
})
export const updatePassword=asyncHandler(async(req,res,next)=>{
    const {oldPassword,newPassword}=req.body;
    const user=await userModel.findById(req.user._id);
    const match=bcrypt.compareSync(oldPassword,user.password);
    if(!match){
        return next(new Error("invalid old password"));
    }
    const hashPassword=bcrypt.hashSync(newPassword,parseInt(process.env.SALTROUND));
    user.password=hashPassword;
    user.save();
    return res.status(200).json({message:"success"});


})
export const shareProfile=async(req,res,next)=>{
    const user=await userModel.findById(req.params.id).select('userName email')
    if(!user){
        return next(new Error('User not found'));
    }
    return res.status(200).json({message:'success',user});
}