import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDB } from '../../lib/db';

import User from '../../lib/db/models/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDB(process.env.MONGODB_URI);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   if (req.method === 'POST') {
    const { society } = req.body;
    const users = await User.find({ society, verified: true, role: 'ADMIN_ROLE' });
    return res.status(200).json(users);
   }
   if (req.method === 'OPTIONS') {
     res.status(200).end();
   }
  return res.status(404).json({
    error: { code: 'not_found', message: 'The requested endpoint was not found or doesn\'t support this method.' }
  });
};
