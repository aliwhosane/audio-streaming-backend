import mongoose, {Schema, Model,Types} from "mongoose";

export interface iPlaylist extends Document {
    stories: Array<string>,
    cover_image: string;
    name: string;
    artist_id: Types.ObjectId;
}

const PlaylistSchema = new Schema<iPlaylist>({
    stories:[{type:Types.ObjectId}],
    name:{type:String, trim:true},
    artist_id: {type:Schema.Types.ObjectId, trim:true, ref: 'Artists'},
    cover_image: {type:String, trim:true}
})

const PlaylistModel: Model<iPlaylist> = mongoose.model('Playlist', PlaylistSchema);
export  default PlaylistModel;