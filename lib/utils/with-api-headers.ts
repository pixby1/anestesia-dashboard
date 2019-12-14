import { NextApiRequest, NextApiResponse } from 'next';

function withApiHeaders(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>, { methods }: { methods: string[] }) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', `${methods.join(',')}, OPTIONS`);
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      return handler(req, res);
    }
}

export { withApiHeaders };
