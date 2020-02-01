// Packages
import { NextApiRequest, NextApiResponse } from 'next';

// Utils
import { errorWrapper, withApiHeaders } from '../../lib/utils';

// Model
import User from '../../lib/db/models/User';

// DB
import { connectToDB } from '../../lib/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDB(process.env.MONGODB_URI);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if(req.method === 'POST') {
    const { society } = req.body;
    const users = await User.find({ society, role: 'ADMIN_ROLE' })
    return res.status(200).json(users);
  }
  return res.status(404).json({
    error: {
      code: 'not_found',
      message: 'The requested endpoint was not found or doesn\'t support this method.'
    }
  });
}

export default errorWrapper(withApiHeaders(handler, { methods: ['POST'] }));
