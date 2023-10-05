import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextApiRequest, NextApiResponse } from 'next';
import { r2 } from 'r2/client';
import { toErrorWithMessage } from 'utils/errors';
import { env } from '~/env.mjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { filename, filetype, prefix } = req.body;

    console.log(`PRESIGNED URL FOR: ${filename} WITH PREFIX ${prefix}`);


    const command = new PutObjectCommand({ Bucket: env.R2_BUCKET_NAME, Key: `${prefix}/${filename}`, ContentType: filetype, ACL: 'public-read' });
    let clientUrl
    try {
        clientUrl = await getSignedUrl(r2, command, { expiresIn: 3600 })
    } catch (error) {
        console.log(toErrorWithMessage(error))
    }

    res.json({ clientUrl })
}