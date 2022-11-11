import nextConnect from 'next-connect';
import { auth } from '../../../middleware';
import Blog from '../../../models/blog';
import { mongoConnect } from '../../../utils/db';

const apiRoute = nextConnect();
apiRoute.use(auth);

apiRoute.post((req, res) => {
    mongoConnect();
    console.log(req.body);
    Blog.findOneAndDelete({ _id: req.body.id })
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