import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "r2/client";
import sharp from "sharp";
import { env } from "~/env.mjs";
import { encode } from "blurhash";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }

    const { sourcePath, targetPath } = req.body

    console.log(sourcePath);
    console.log(targetPath);


    const dwCommand = new GetObjectCommand({ Bucket: env.R2_BUCKET_NAME, Key: sourcePath });
    const data = await r2.send(dwCommand)

    const str = await data.Body?.transformToByteArray()

    const image = sharp(str as Buffer);

    const webpImage = await image.toFormat('webp').toBuffer();

    const buf = await image.resize(16, 16, { fit: 'fill' }).ensureAlpha().raw().toBuffer()
    const blurHash = encode(Uint8ClampedArray.from(buf), 16, 16, 4, 4)



    await r2.send(new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: `${targetPath}.webp`, ContentType: 'webp', ACL: 'public-read', Body: webpImage
    }));

    res.json({ blurHash: blurHash })
}