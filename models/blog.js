import { Schema, model, models } from "mongoose";

const blogSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    heading: {
        type: String,
        required: true
    },

    definition: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Blog = models.Blog || model('Blog', blogSchema);
export default Blog;