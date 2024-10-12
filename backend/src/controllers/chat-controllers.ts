const { GoogleGenerativeAI } = require("@google/generative-ai");

// import OpenAI from 'openai';
// import  ChatCompletionMessageParamsNonStreaming from 'openai'


import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {

    // find user with jwt data 
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    
      // initialise google gen ai 
      const genAI = new GoogleGenerativeAI(process.env.API_KEY);
      
      // get model instance 
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    //  generate content 
      const result = await model.generateContent(message);
      console.log(result.response.text());
      const generatedMessage = result.response.text();
      // return res.status(200).json();
      user.chats.push({ content: message, role: "user" });  // User's input
      user.chats.push({ content: generatedMessage, role: "assistant" });  // Generated response
      // update chats
      await user.save();

      // return updated chats to the user 

      return res.status(200).json({chats:user.chats});


  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// export const generateChatCompletion = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { message } = req.body;
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user)
//       return res
//         .status(401)
//         .json({ message: "User not registered OR Token malfunctioned" });
//     // grab chats of user
//     const chats = user.chats.map(({ role, content }) => ({
//       role,
//       content,
     
//     }));
    
//     chats.push({ content: message, role: "user" });
//     user.chats.push({ content: message, role: "user" });


//     // send all chats with new one to openAI API
//     const openai = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY 
//     });
    
       
  
//     const chatResponse = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages:[{"role":"user","content":"testing chat response "}],
     
//     });
// console.log("latest chat response is here=> ",chatResponse.choices[0].message);

//     user.chats.push(chatResponse.choices[0].message);
//     await user.save();
//     return res.status(200).json({ chats: user.chats });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};