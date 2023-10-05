export interface Review {
    text:string,
    rating:number,
    imagePublicUrl?:string,
    imageBlurHash?:string,
}

export interface Report {
    reason:string,
}

export interface Block{
    reason:string,
}