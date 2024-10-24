// import { NextFunction ,Request,Response} from 'express';
// import jwt from 'jsonwebtoken'
// import { COOKIE_NAME } from './constants';

// export const createToken = (id:string,email:string,expiresIn)=>{
//     const payload ={id,email};
//     const token = jwt.sign(payload,process.env.JWT_SECRET ,{
//         expiresIn:"7d",
//     } );
//     return token;
// }



// export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.signedCookies[COOKIE_NAME];

//   console.log("TOKEN =>", token);  // Check if token is received

//   if (!token || token.trim() === "") {
//     return res.status(401).json({ message: "Token Not Received" });
//   }

//   return new Promise<void>((resolve, reject) => {
//     jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
//       if (err) {
//         reject(err.message);
//         return res.status(401).json({ message: "Token Expired" });
//       } else {
//         console.log("Token verification successful");
//         res.locals.jwtData = success;
//         resolve();
//         return next();
//       }
//     });
//   });
// };


import { NextFunction ,Request,Response} from 'express';
import jwt from 'jsonwebtoken'
import { COOKIE_NAME } from './constants';

export const createToken = (id:string,email:string,expiresIn)=>{
    const payload ={id,email};
    const token = jwt.sign(payload,process.env.JWT_SECRET ,{
        expiresIn:"7d",
    } );
    return token;
}



export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies[COOKIE_NAME];

  console.log("TOKEN =>", token);  // Check if token is received

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  return new Promise<void>((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        console.log("Token verification successful");
        res.locals.jwtData = success;
        resolve();
        return next();
      }
    });
  });
};
