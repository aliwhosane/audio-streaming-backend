import mongoose,{ Types, Schema, Model } from "mongoose";

export interface iLike extends Document {
    user_id: Types.ObjectId;
    track_id: Types.ObjectId;
    playlist_id: Types.ObjectId;
}

const LikeSchema = new Schema<iLike>({
    user_id:{type:Schema.Types.ObjectId},
    track_id:{type:Schema.Types.ObjectId},
    playlist_id:{type:Schema.Types.ObjectId}
});

const LikeModel:Model<iLike> = mongoose.model('Like', LikeSchema);
export default LikeModel;