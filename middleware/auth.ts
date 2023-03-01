import { Request, Response, NextFunction } from "express";
import { HTTP_CODES } from "../constants/httpcodes";
import { pHandler } from "../utils/promise_handler";
import { TokenManager } from "../utils/token_manager";

export interface AuthorizedRequest extends Request {
    userId?: string;
    userTokenPayload?:any
}

export class Authenticator  {
    private static __instance:Authenticator;

    static get instance():Authenticator {
        if(!this.__instance) this.__instance = new Authenticator();        
        return this.instance;
    }

    async isAuthorized(req:AuthorizedRequest, res:Response, next:NextFunction) {
        const token = TokenManager.extractTokenFromRequest(req);
        if(!token)
        return res.status(HTTP_CODES.FORBIDDEN).json({message:'User unauthorized'});

        const [tokenErr, tokenPaylod] = await pHandler(TokenManager.instance.verifyToken(token));
        if(tokenErr)
        return res.status(HTTP_CODES.FORBIDDEN).json({message: 'Invalid Token'}); 
        req.userId = tokenPaylod.user._id;
        req.userTokenPayload = tokenPaylod;
        next();

    }
}