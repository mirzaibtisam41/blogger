import mongoose from "mongoose";
import nextConnect from 'next-connect';
import { auth } from '../../../middleware';
import Blog from '../../../models/blog';
import Category from '../../../models/category';
import { mongoConnect } from '../../../utils/db';

const apiRoute = nextConnect();
apiRoute.use(auth);

apiRoute.post((req, res) => {
    mongoConnect();
    let id = mongoose.Types.ObjectId(req.user);
    let postPerPage = 8;
    let start = req.body.page * postPerPage;
    Blog.find({ user: id }).count().then(count => {
        Blog.aggregate([
            { $match: { user: id } },
            {
                $lookup: {
                    from: Category.collection.name,
                    localField: 'category',
                    foreignField: '_id',
                    as: 'Category'
                }
            },
            { $unwind: '$Category' },
            { $project: { category: 0 } },
            { $sort: { createdAt: -1 } },
            { $skip: start },
            { $limit: postPerPage }
        ])
            .then(data => {
                return res.status(200).json({ blogs: data, count });
            })
            .catch(err => {
                return res.status(400).json(err);
            });
    })
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: true
    },
};