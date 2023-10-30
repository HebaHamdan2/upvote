import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import initApp from './Src/Modules/app.router.js';
const app=express();
const PORT=process.env.PORT||3000;
initApp(app,express);
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})