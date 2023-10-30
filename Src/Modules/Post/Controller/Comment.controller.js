import commentModel from "../../../../DB/Models/Comment.model.js";
import postModel from "../../../../DB/Models/Post.model.js";
import { asyncHandler } from "../../../Middleware/errorHandling.js";
import coludinary from "../../../Services/coludinary.js";

export const createComment=asyncHandler(async(req,res,next)=>{
   req.body.postId=req.params.id;
   req.body.userId=req.user._id;
   const post=await postModel.findById(req.params.id);
   if(!post){
    return next(new Error("invalid post id"))
}
if(req.file){
    const {secure_url,public_id}=await coludinary.uploader.upload(req.file.path,{folder:'comment'});
    req.body.image={secure_url,public_id};
}
const comment =await commentModel.create(req.body);
return res.status(201).json({message:"success",comment});

})