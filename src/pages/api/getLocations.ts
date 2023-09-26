import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { toErrorWithMessage } from '~/utils/errors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }

    try {
        const locationsWithTypes = await db.location.findMany({
            include:{
                eventTypes: true
            }
        })
        res.status(200).json({ locationsWithTypes: locationsWithTypes })

    } catch (error) {
        res.status(500).send(toErrorWithMessage(error));
    }
}