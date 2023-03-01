import UserModel from "../../models/user";
import { UserCriteria, User } from "./user_interface";

export class UserService {
    private static __instance: UserService;

    static get instance():UserService {
        if(!this.__instance) this.__instance = new UserService();
        return this.__instance
    }

    async ifUserExists(email:string, password?:string): Promise<boolean> {
        let criteria: UserCriteria = {email};
        if(password) {
            criteria = {...criteria,  password}
        }
        const user = await UserModel.findOne(criteria);
        if(!user)  return false;
        return true;
    }

    async getUser(email:string, password?:string):Promise<User>{
        let criteria:UserCriteria = {email};
        if(password) criteria = {...criteria,password};

        const user:User| null = await UserModel.findOne(criteria);
        return user!;
    }
    async createUser(user: User): Promise<User> {
        const userResponse = await UserModel.create(user) as User;
        return userResponse    
    }

    async getActiveUserById(_id:string, projection?:any, populate?:any):Promise<User> {
        const criteria = { _id, status: true };
        let user: User | null;
        if (populate) {
            user = await UserModel.findOne(criteria, projection).populate(populate);
        } else {
            user = await UserModel.findOne(criteria, projection);
        }
        return user!;
    }
}