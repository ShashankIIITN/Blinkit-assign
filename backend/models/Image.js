import { Schema, model } from "mongoose";

const imageSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
    },
    name: String,
    data: Buffer,
    contentType: String
});
export default model('Image', imageSchema);