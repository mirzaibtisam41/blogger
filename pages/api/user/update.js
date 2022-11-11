import nextConnect from 'next-connect';
import passwordHash from 'password-hash';
import { auth } from '../../../middleware';
import User from "../../../models/user";
import { mongoConnect } from "../../../utils/db";
import cors from 'cors';

const apiRoute = nextConnect();
apiRoute.use(cors());
apiRoute.use(auth);

apiRoute.post((req, res) => {
    mongoConnect();
    const { fullname, password } = req.body;
    let updateObj = {};
    if (fullname) updateObj.fullname = fullname;
    if (password) updateObj.password = passwordHash.generate(password);

    User.findOneAndUpdate(
        { _id: req.user },
        { $set: updateObj },
        { new: true }
    ).then(data => {
        return res.status(200).json(data);
    }).catch(err => {
        return res.status(200).json(err);
    });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: true
    },
};