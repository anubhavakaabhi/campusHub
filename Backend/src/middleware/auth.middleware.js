
import jwt from 'jsonwebtoken'

async function verifyAccesstoken(req, res , next) {
    const token = req.cookies.accessToken;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(401);
        }

        req.user = decoded;
        next();
    });
}

export {verifyAccesstoken}