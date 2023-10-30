import express from 'express';
const app=express();
import * as authController from './Controller/Auth.controller.js'
import { asyncHandler } from '../../Middleware/errorHandling.js';
import { signinSchema, signupSchema } from './Auth.validation.js';
import validation from '../../Middleware/validation.js';

app.post('/signup',validation(signupSchema),asyncHandler(authController.signup));
app.post('/signin',validation(signinSchema),asyncHandler(authController.signin));
app.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail))
app.get('/NewconfirmEmail/:refreshToken',asyncHandler(authController.nweconfirmEmail))

export default app;
