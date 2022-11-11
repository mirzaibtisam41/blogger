import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decode = jwt.verify(token, 'secret');
        req.user = decode.data;
        next();
    } catch (error) {
        return res.json({ status: false, message: 'User authentication failed' });
    }
}

export { auth };