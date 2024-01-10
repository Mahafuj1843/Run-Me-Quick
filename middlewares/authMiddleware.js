import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

export const verifyToken = (req, res, next) =>{
      const token = req.headers.token;
      //const token = req.cookies.access_token
    if(!token){
        req.user = null;
        next();
    }else{
        jwt.verify(token, process.env.JWT,(err, user)=>{
            if(err) return next(createError(403, "Token is not authorized."));
            else{
                req.user = user;
                next();
            }
        });
    }
}