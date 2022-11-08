import mongoose from "mongoose";

export const mongoConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(data => {
            return true;
        }).catch(err => {
           return false;
        });
}