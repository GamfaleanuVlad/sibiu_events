import { env } from "~/env.mjs";


export const publicR2URL = (key: string) => {
    return `${env.NEXT_PUBLIC_R2_ENDPOINT || `https://${env.NEXT_PUBLIC_R2_ID}.r2.dev`}/${key}`;
}