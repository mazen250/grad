import mongoose from "mongoose";
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
    user_id: {
        type: String,
    }
    ,body: {
        type: String,
        default: "",
    },
    seen: {
        type: Boolean,
        default: false,
    }
})
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;