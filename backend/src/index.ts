import app from "./app";
import { dbConnection } from "./database/connection";

const PORT = process.env.PORT  || 5000


dbConnection()
   .then(()=>{
    app.listen(PORT,()=>console.log("server run & connected to database"))
    })
    .catch((err)=>console.log(err));
