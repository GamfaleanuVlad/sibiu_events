import { NextApiRequest, NextApiResponse } from 'next';
import { EventFull, LocationFull, getFullEvent, getFullEvents, getFullLocations } from '~/types';
import { toErrorWithMessage } from '~/utils/errors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }

    try {
        const eventFull: EventFull | null = await getFullEvent(
            {
                id: req.body.eventId
            }
        )
        res.status(200).json({ eventFull: eventFull })

    } catch (error) {
        res.status(500).send(toErrorWithMessage(error));
    }
}