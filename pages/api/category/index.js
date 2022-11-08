import { mongoConnect } from '../../../utils/db';
import Category from '../../../models/category';
import nextConnect from 'next-connect';

const apiRoute = nextConnect();

apiRoute.post((req, res) => {
    mongoConnect();
    Category.create(req.body)
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(err => {
            return res.status(400).json(err);
        });
});

apiRoute.get((req, res) => {
    mongoConnect();
    Category.find()
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
        bodyParser: true
    },
};