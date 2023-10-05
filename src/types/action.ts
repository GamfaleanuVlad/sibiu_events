export interface Review {
    text:string,
    rating:number|null,
    imagePublicUrl:string|null,
    imageBlurHash:string|null,
}

export interface Report {
    reason:string,
}

export interface Block{
    reason:string,
}
