import commentModel from "../../../../DB/Models/Comment.model.js";
import postModel from "../../../../DB/Models/Post.model.js";
import {asyncHandler} from "../../../Middleware/errorHandling.js";
import coludinary from "../../../Services/coludinary.js";
export const getPosts=asyncHandler(async(req,res,next)=>{
    const posts=await postModel.find({}).populate([
        {
            path:'userId',
            select:'userName'
        },
        {
            path:'like',
            select:'userName'
        },
        {
            path:'unlike',
            select:'userName'
        }
    ])
    const postList=[];
    for(const post of posts){
        const comment =await commentModel.find({postId:post._id});
        postList.push({post,comment});
    }
  return res.status(200).json({message:"success",postList});
})
export const create=asyncHandler(async(req,res,next)=>{
 const {title,caption}=req.body;
const id=req.user._id;
const{public_id,secure_url}=await coludinary.uploader.upload(req.file.path,{floder:'post'});
const post=await postModel.create({title,caption,image:{secure_url,public_id},userId:id});
return res.json({message:"success",post});
})
export const likePost=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const user_id=req.user._id;
    const post= await postModel.findByIdAndUpdate(id,{$addToSet:{like:user_id},$pull:{unlike:user_id}},{new:true})
    post.totalVote=post.like.length-post.unlike.length;
    await post.save();
    return res.status(200).json({message:"success",post});
})
export const unlikePost=asyncHandler(async(req,res,next)=>{
    const user_id=req.user._id;
    const {id}=req.params;
    const post=await postModel.findByIdAndUpdate(id,{$addToSet:{unlike:user_id},$pull:{like:user_id}},{new:true})
    post.totalVote=post.like.length-post.unlike.length;
    await post.save();
    return res.status(200).json({message:"success",post});
})