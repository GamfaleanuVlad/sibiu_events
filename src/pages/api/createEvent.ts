import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { EventSimple } from '~/types';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {


    if(req.method !== 'POST') {
        res.status(405).end()
        return
    }

    console.log(req.body);
    

    const eventSimple : EventSimple = await db.event.create({
        data:{
            name: req.body.name,
            date: req.body.date,
            maxPers: req.body.maxPers,
            price: req.body.price,
            locationId: req.body.locationId,
            eventTypeId: req.body.eventTypeId,
            creatorId: req.body.creatorId,
        }
    })

    res.status(200).json({eventSimple:eventSimple})
}