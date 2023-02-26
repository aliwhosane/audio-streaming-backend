import mongoose, { Model, Schema } from "mongoose";

export interface iPath extends Document {
    name: string,
    path?:string;
    durration:string;
}

const StorySchema = new Schema<iPath> ({
    name:{type: String, trim:true, required:true},
    path:{type: String, trim:true},
    durration:{type: String, trim: true},
});

StorySchema.index({ path: 1 }, { unique: true });

const PathModel: Model<iPath> =  mongoose.model('Story', StorySchema);
export default PathModel;