import multer from "multer";
import jwt from "jsonwebtoken";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/uploads`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

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

export { upload, auth };