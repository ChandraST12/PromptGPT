import express from "express";
import { config } from "dotenv";
import appRouter from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./database/connection";

config();
const app = express();

// middlewares
app.use(cors({
  origin: 'https://prompt-gpt-4s8s.vercel.app', // No trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options('*', cors());  // Add this to handle preflight requests


app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// routes
app.use("/api/v1", appRouter);

const PORT = process.env.PORT || 5000;

dbConnection()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} & connected to database`));
  })
  .catch((err) => console.log(err));

export default app;
