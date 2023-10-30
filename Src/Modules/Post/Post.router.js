import {Router} from 'express';
import fileUpload, { fileValidation } from '../../Services/cloudMulter.js';
import * as postController from './Controller/Post.controller.js'
import * as commentConroller from './Controller/Comment.controller.js'
import { auth } from '../../Middleware/Auth.Middleware.js';
const router=Router();
router.get('/',postController.getPosts);
router.post('/',fileUpload(fileValidation.image).single('image'),auth,postController.create)
router.patch('/:id/like',auth,postController.likePost);
router.patch('/:id/unlike',auth,postController.unlikePost)
router.post("/:id/comment",auth,fileUpload(fileValidation.image).single('image'),commentConroller.createComment)
export default router;