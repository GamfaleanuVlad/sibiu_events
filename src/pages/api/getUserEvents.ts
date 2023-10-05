import { NextApiRequest, NextApiResponse } from 'next';
import { ActionEvent, EventFull, LocationFull, getActionsEvent, getFullEvents, getFullLocations } from '~/types';
import { toErrorWithMessage } from '~/utils/errors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }    

    try {
        const createdEventsFull : EventFull[] = await getFullEvents({
            creatorId: req.body.creatorId
        })
        const participatedEventsFull : ActionEvent[] =   await getActionsEvent({
            creatorId: req.body.creatorId,
            type : 'register'
        })
        const userEvents : {
            createdEventsFull: EventFull[],
            participatedEventsFull: ActionEvent[]
        } = {
            createdEventsFull,
            participatedEventsFull
        }        
        res.status(200).json({ userEvents: userEvents })

    } catch (error) {
        res.status(500).send(toErrorWithMessage(error));
    }
}