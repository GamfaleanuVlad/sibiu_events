import { NextApiRequest, NextApiResponse } from 'next';
import { LocationFull, getFullLocations } from '~/types';
import { toErrorWithMessage } from '~/utils/errors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }

    try {
        const locationsFull : LocationFull[] = await getFullLocations()
        res.status(200).json({ locationsFull: locationsFull })

    } catch (error) {
        res.status(500).send(toErrorWithMessage(error));
    }
}