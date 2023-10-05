import { Action } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { Review } from '~/types/action';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }

    const {
        creatorId,
        targetEventId,
        text,
        rating,
        imagePublicUrl,
        blurHash, } = req.body

    const actionObj: Review = {
        rating: rating,
        text: text,
        imagePublicUrl: imagePublicUrl,
        imageBlurHash: blurHash
    }

    const actionJSON = JSON.stringify(actionObj)

    const action: Action = await db.action.create({
        data: {
            type: 'review',
            creatorId: creatorId,
            targetEventId: targetEventId,
            text: actionJSON,
        }
    })

    res.status(200).json({ action: action })
}