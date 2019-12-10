// mongoose
const mongoose=require('mongoose');

function connect(){
    return new Promise((resolve,reject)=>{
        mongoose.connect(process.env.DB_CONNECT, {
            useUnifiedTopology: true,
            useNewUrlParser: true})
            .then((res,err) => {
                if(err) return reject(err)
                console.log("Connected to Database");
                resolve();
            })
            .catch(err => {
                console.error("An error has occured", err);
                reject(err);    
            });
        
    })
} 
function close(){
    return mongoose.disconnect();
}
module.exports={connect,close}