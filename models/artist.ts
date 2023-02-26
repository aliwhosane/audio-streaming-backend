import mongoose, { Model, Schema } from "mongoose";

export interface iArtist extends Document {
    name: string,
    email?:string;
    password?:string;
    phone?:string;
    dp?:string;
}

const ArtistSchema = new Schema<iArtist> ({
    name:{type: String, trim:true, required:true},
    email:{type: String, trim:true},
    password:{type: String, trim: true},
    phone: {type:String, trim:true},
    dp:{type:String}
});

ArtistSchema.index({ email: 1 }, { unique: true });

const ArtistModel: Model<iArtist> =  mongoose.model('Artist', ArtistSchema);
export default ArtistModel