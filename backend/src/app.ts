import express from "express";
import { config } from "dotenv";
import appRouter from "./routes";
import cookieParser from "cookie-parser"
import cors from "cors"
config()
const app = express();

// middlewares
app.use(cors({origin:'https://prompt-gpt-4s8s.vercel.app/',methods: ['GET', 'POST'],credentials:true}))
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));



app.use("/api/v1",appRouter)




export default app