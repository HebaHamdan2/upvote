import authRouter from './Auth/Auth.router.js'
import connectDB from '../../DB/connection.js';
import userRouter from './User/User.router.js';
import postRouter from './Post/Post.router.js'
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from 'url';
import { globalErrorHandler } from '../Middleware/errorHandling.js';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
 const initApp=(app,express)=>{
    const fullPath=path.join(__dirname,'../upload');
    connectDB();
    app.use(express.json());
    app.use(cors());
    app.use('/upload',express.static(fullPath))
    app.use('/Auth',authRouter)
    app.use('/user',userRouter)
    app.use('/post',postRouter)
    app.use('*',(req,res)=>{
        return res.json({message:"page not found"});
    })
    app.use(globalErrorHandler);
}
export default initApp;