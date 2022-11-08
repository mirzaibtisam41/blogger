import { mongoConnect } from "../../../utils/db";
import User from "../../../models/user";
import passwordHash from 'password-hash';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    mongoConnect();
    const _user = await User.findOne({ email: req.body.email });
    if (!_user) {
        req.body.password = passwordHash.generate(req.body.password);
        User.create(req.body).then(data => {
            let token = jwt.sign({
                data: data._id
            }, 'secret', { expiresIn: '1d' });
            res.status(200).json({ user: data, token });
        }).catch(err => {
            res.status(400).json(err);
        });
    }
    else {
        res.status(401).json({ error: 'Email already exist' });
    }
}