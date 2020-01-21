// Packages
import { NextApiRequest, NextApiResponse } from 'next';

// Utils
import { errorWrapper } from '../../lib/utils/error-wrapper';

// Model
import User from '../../lib/db/models/User';

// DB
import { connectToDB } from '../../lib/db';

async function hanlder(req: NextApiRequest, res: NextApiResponse) {
    await connectToDB(process.env.MONGODB_URI)
    if (req.method === 'GET') {
        const users = await User.find({ state: 'PENDING' });
       return res.status(200).json(users);
    }
    return res.status(404).json({
        error: {
            code: 'not_found',
            message: "The requested endpoint was not found or doesn\'t support this method."
        }
    });
}

export default errorWrapper(hanlder);
