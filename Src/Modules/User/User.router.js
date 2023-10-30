import express from 'express';
const app=express();
import * as userController from './Controller/User.controller.js';
import {auth} from '../../Middleware/Auth.Middleware.js'
import * as validators from './User.validation.js'
import fileUpload, { fileValidation } from '../../Services/cloudMulter.js';
import validation from '../../Middleware/validation.js';
app.get('/',fileUpload(fileValidation.image).single('image'),validation(validators.profile),auth,userController.profile);
app.patch('/cover',fileUpload(fileValidation.image).array('image',5),auth,userController.coverPic)
app.patch('/updatePassword',auth,validation(validators.updatePassword),userController.updatePassword);
app.get('/:id/profile',validation(validators.shareProfile),userController.shareProfile)
export default app;