import nextConnect from 'next-connect';
import { upload } from '../../../middleware';
import Blog from '../../../models/blog';
import Category from '../../../models/category';
import { mongoConnect } from '../../../utils/db';

const apiRoute = nextConnect();
const uploadMiddleware = upload.single('file');
apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
    mongoConnect();
    req.body.image = `/uploads/${req.file.originalname}`;
    Blog.create(req.body)
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(err => {
            return res.status(400).json(err);
        });
});

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
        { $limit: 6 }
    ])
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(err => {
            return res.status(400).json(err);
        });
});

apiRoute.post((req, res) => {
    console.log(req.body);
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    },
};