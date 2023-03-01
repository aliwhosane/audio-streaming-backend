import { NextFunction, Request, Response } from "express";
import { HTTP_CODES } from "../../constants/httpcodes";
import { AuthorizedRequest } from "../../middleware/auth";
import { md5 } from "../../utils/crypto_manager";
import { TokenManager } from "../../utils/token_manager";
import { BaseController } from "../base_controller";
import { UserService } from "./user_service";
import * as joi from "joi";

const userService =  UserService.instance;
const tokenManager = TokenManager.instance;

export class UserController extends BaseController {
    private static __instance:UserController;

    static get instance() {
        if(!this.__instance) this.__instance = new UserController();
        return this.__instance;
    }

    async signUp(req:Request,res:Response,next:NextFunction) {
        try {
            let {name,email,password,phone} =  req.body;
            const isAlreadyUser = await userService.ifUserExists(email);
            if(!isAlreadyUser) {
                const response = await userService.createUser({name,email, password:md5(password)});
                const user = {_id: response._id, name,  email, profile_pic: '', created_at: response.created_at}
           const jwtToken = await tokenManager.createToken({user})
           return res.status(HTTP_CODES.OK).json({token:jwtToken, user});
            } else  {
                res.status(HTTP_CODES.CONFLICT).json({message:'User already exists'});
            }
        }catch(e:unknown) {
            next(e);
    } 
    }

    async login(req:Request, res:Response, next:NextFunction){
        try {
            let {email,password} = req.body;
            email = email.toLowerCase();

            const isAlreadyUser = await userService.ifUserExists(email);
            if(isAlreadyUser) {
                const user = await userService.getUser(email, md5(password));
                if (user) {
                    const jwtToken = await tokenManager.createToken({ user });
                    delete user.password;
                    return res.status(HTTP_CODES.OK).json({ token: jwtToken, user });
                } else {
                    return res.status(HTTP_CODES.BAD_REQUEST).json({ message: "Invalid Credentials" });
                }
            } else {
                return res.status(HTTP_CODES.BAD_REQUEST).json({message: "Invalid Credentials"})
            }

        } catch(e) {
            next(e);
        }
    };

    async validateToken(req:AuthorizedRequest,res:Response,next:NextFunction) {
        try {
            const user = await userService.getActiveUserById(req.userId!);
            return res.status(HTTP_CODES.OK).json({user});
        }catch (e) {
            next(e);
        }
    }

    async details (req:AuthorizedRequest, res: Response, next: NextFunction) {
        try{
            const user = await userService.getActiveUserById(req.userId!);
            return res.status(HTTP_CODES.OK).json({user});
        } catch(e) {
            next(e);
        }
    }

  async findUserById(req:AuthorizedRequest, res:Response, next:NextFunction){
    try {
        const body = await joi.object().keys({id:joi.string().required()}).validateAsync(req.params);
        const user = await userService.getActiveUserById(req.body.id!);
        return res.status(HTTP_CODES.OK).json({user,message:'User Details'});
    } catch(e) {
        next(e);
    }
  }


}