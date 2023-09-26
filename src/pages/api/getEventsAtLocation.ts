import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { toErrorWithMessage } from '~/utils/errors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }

    try {
        const eventsFull = await db.event.findMany({
            where: {
                locationId: req.body.id
            },
            include:{
                location: true,
                creator: true,
            }
        })
        res.status(200).json({ eventsFull: eventsFull })

    } catch (error) {
        res.status(500).send(toErrorWithMessage(error));
    }
}