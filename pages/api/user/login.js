import { mongoConnect } from "../../../utils/db";
import User from "../../../models/user";
import passwordHash from 'password-hash';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    mongoConnect();
    const _user = await User.findOne({ email: req.body.email })

    if (!_user) {
        return res.status(400).json({ error: 'Email not exist' });
    }
    else if (_user) {
        const verify = passwordHash.verify(req.body.password, _user.password);
        if (!verify) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        else if (verify) {
            let token = jwt.sign({
                data: _user._id
            }, 'secret', { expiresIn: '1d' });
            return res.status(200).json({ user: _user, token });
        }
    }
}