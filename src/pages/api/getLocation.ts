import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { LocationFull, getFullLocation } from '~/types';
import { toErrorWithMessage } from '~/utils/errors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }

    try {

        const locationFull: LocationFull | null = await getFullLocation(
            {
                id: req.body.id
            }
        )
        res.status(200).json({ locationFull: locationFull })

    } catch (error) {
        res.status(500).send(toErrorWithMessage(error));
    }
}