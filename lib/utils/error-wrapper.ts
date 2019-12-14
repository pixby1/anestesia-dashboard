import { NextApiRequest, NextApiResponse } from 'next';

function errorWrapper(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const response = await handler(req, res);
            return response;
        } catch (err) {
            console.log('Theres been a problem');
            console.error(err);
            return res.status(500).json({
                error: {
                    code: 'unexpected_error',
                    status: 'Unexpected Error.'
                }
            });
        }
    }
}

export { errorWrapper };
