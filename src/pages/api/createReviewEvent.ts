import { Action } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {


    if(req.method !== 'POST') {
        res.status(405).end()
        return
    }

    console.log(req.body);
    

    const action : Action = await db.action.create({
        data:{
            type: 'review',
            creatorId: req.body.creatorId,
            targetEventId: req.body.targetEventId,
            text: req.body.text,
        }
    })

    res.status(200).json({action:action})
}