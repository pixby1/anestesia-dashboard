// Packages
import { NextApiRequest, NextApiResponse } from 'next';

// Models
import User from '../../lib/db/models/User';

// DB
import { connectToDB } from '../../lib/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // connect to DB
  await connectToDB(process.env.MONGODB_URI);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if(req.method === 'GET') {
    // This need a Middleware
    const users = await User.find();
    return res.status(200).json(users);
  }
  if (req.method === 'POST') {
    // public but enable CORS
    const { name, lastName, email, jobRole, dni, country, society, date } = req.body;
    const user = new User({ name, lastName, email, jobRole, dni, country, society, date });
    await user.save();
    return res.status(200).end();
  }
  if(req.method === 'PUT') {
    // This need a Middleware
  }

  if(req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  return res.status(404).json({
    error: {
      code: 'not_found',
      message:
        "The requested endpoint was not found or doesn't support this method."
    }
  });
}
