import { NextApiRequest } from 'next';

export type NextRequest = NextApiRequest & {
    user: any;
}
