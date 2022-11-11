import nextConnect from 'next-connect';
import Blog from '../../../models/blog';
import Category from '../../../models/category';
import { mongoConnect } from '../../../utils/db';

const apiRoute = nextConnect();

apiRoute.get((req, res) => {
    mongoConnect();
    Blog.aggregate([
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
        { $limit: 8 }
    ])
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(err => {
            return res.status(400).json(err);
        });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    },
};