import { NextApiRequest, NextApiResponse } from 'next';
import { ActionEvent, EventFull, LocationFull, getActionsEvent, getFullEvents, getFullLocations } from '~/types';
import { Review } from '~/types/action';
import { toErrorWithMessage } from '~/utils/errors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }

    try {

        const eventReviews: ActionEvent[] = await getActionsEvent({
            targetEventId: req.body.targetEventId,
            type: 'review'
        })

        res.status(200).json({ eventReviews: eventReviews })

    } catch (error) {
        res.status(500).send(toErrorWithMessage(error));
    }
}