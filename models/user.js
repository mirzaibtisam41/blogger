import { Schema, model, models } from "mongoose";

const userSchema = new Schema({

    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: 'https://i.ibb.co/2hCxz4T/Avatar-icon-green-svg.png'
    }

}, { timestamps: true });

const User = models.User || model('User', userSchema);
export default User;