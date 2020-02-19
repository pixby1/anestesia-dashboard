// Packages
import { NextApiRequest, NextApiResponse } from 'next';

// Utils
import { errorWrapper } from '../../lib/utils/error-wrapper';

// Model
import User from '../../lib/db/models/User';

// DB
import { connectToDB } from '../../lib/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDB(process.env.MONGODB_URI)
    const { query } = req;
    if (req.method === 'GET' && Object.keys(query).length) {
        if(query.name) {
            // @ts-ignore
            const regex = new RegExp(query.name, 'i');
            query.name = regex;
        }
        if(query.lastName) {
            // @ts-ignore
            const regex = new RegExp(query.lastName, 'i');
            query.lastName = regex;
        }
        const user = await User.find({ $and: [ { $or: [query] },  { state: 'APPROVED', userRemove: false } ] });
        return res.status(200).json(user);
    }
    if (req.method === 'GET') {
        const users = await User.find({ state: 'APPROVED', userRemove: false });
       return res.status(200).json(users);
    }
    return res.status(404).json({
        error: {
            code: 'not_found',
            message: "The requested endpoint was not found or doesn\'t support this method."
        }
    });
}

export default errorWrapper(handler);
