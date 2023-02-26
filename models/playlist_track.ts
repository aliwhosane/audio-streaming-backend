import mongoose, { Model, Schema, Types } from "mongoose";

export interface iPlaylistTrack extends Document {
playlist_id: Types.ObjectId;
stories_id: Types.ObjectId;
}

const PlaylistTrackSchema = new Schema<iPlaylistTrack>({
    playlist_id: {type:Schema.Types.ObjectId, ref:"Playlists"},
    stories_id: {type:Schema.Types.ObjectId, ref:"Stories"}
})

const PlaylistTrackModel:Model<iPlaylistTrack> = mongoose.model("PlaylistTrack", PlaylistTrackSchema);
export default PlaylistTrackModel;