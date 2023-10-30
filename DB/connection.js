import mongoose ,{mongo} from 'mongoose';

const connectDB=async()=>{
    mongoose.set('strictQuery', true);
    return await mongoose.connect(process.env.DB_LOCAL)
   
    .then(()=>{
        console.log("db connection established");
    }).catch((error)=>{
     console.log(`error to connect db:${error}`);
    })
}
 export default connectDB;