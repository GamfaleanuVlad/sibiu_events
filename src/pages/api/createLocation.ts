import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { EventSimple } from '~/types';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {


    if(req.method !== 'POST') {
        res.status(405).end()
        return
    }

    console.log(req.body);
    

    const eventLocation  = await db.location.create({
        data:{
            address : req.body.address,
            image : req.body.image,
            lat : req.body.lat,
            long : req.body.long,
            name : req.body.name,
        }
    })

    res.status(200).json({eventLocation:eventLocation})
}