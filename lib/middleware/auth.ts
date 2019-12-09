import * as jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import { NextApiResponse, NextApiRequest } from 'next';

const jwtVerify = Promise.promisify(jwt.verify);


function checkToken(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.cookies;
    if (!token) {
         res.status(401).json({ 
            error: {
                code: 'token_requried',
                message: 'Token required'
            }
        });
    }
    return jwtVerify(token, '2BD41682-8DA5-438B-808A-05C4E12EC919')
    .then(decode => {
        return decode;
    })
    .catch(err => {
        console.error(err);
        res.status(401).json({ 
            error: {
                code: 'token_expired',
                message: 'Token expired'
            }
        });
    });
}

export { checkToken };