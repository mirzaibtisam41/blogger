import nextConnect from 'next-connect';
import { auth, upload } from '../../../middleware';
import Blog from '../../../models/blog';
import { mongoConnect } from '../../../utils/db';

const apiRoute = nextConnect();
const uploadMiddleware = upload.single('file');
apiRoute.use(auth);
apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
    mongoConnect();
    req.body.image = `/uploads/${req.file.originalname}`;
    req.body.user = req.user;
    Blog.create(req.body)
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