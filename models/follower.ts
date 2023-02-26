import mongoose, { Schema, Model, Types } from "mongoose";

export interface iFollower extends Document{
    user_id: Types.ObjectId;
    artist_id:Types.ObjectId;
}

const FollowerSchema = new Schema<iFollower>({
    user_id: { type: Schema.Types.ObjectId,trim: true, ref:'Users' },
    artist_id: {type: Schema.Types.ObjectId, trim: true, ref:'Artists'}
})

const FollowerModel: Model<iFollower> = mongoose.model('Follower', FollowerSchema);
export default FollowerModel;