import mongoose,{Schema, Model, Document} from "mongoose";

interface VerificationStatus  {
    email:boolean;
    phone:boolean;
}

export interface iUser extends Document{
    name: string;
    email?:string;
    password?:string;
    phone?:string;
    dob?:Date;
    profile_pic?:string;
    verified:VerificationStatus;
    last_visited:Date

}

const UserSchema = new Schema<iUser> (
    {
        name:{type: String, trim:true, required:true},
        email:{type: String, trim:true},
        password:{type: String, trim: true},
        phone: {type:String, trim:true},
        profile_pic:{type:String, trim:true},
        dob:{type:Date},
        verified:{type:{phone:Boolean,email:Boolean}, default:{email:false, phone:false}}
    }
);

UserSchema.index({ email: 1 }, { unique: true });

const UserModel: Model<iUser> = mongoose.model('User', UserSchema);
export default UserModel