export interface UserCriteria{
    password?:string;
    email: string;
}

export interface User {
    _id?:string;
    name:string;
    email?:string;
    phone?:string;
    password?:string;
    profile_pic?:string;
    created_at?:Date;
}