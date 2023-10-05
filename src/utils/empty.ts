import { EventFull } from "~/types";
import { Review } from "~/types/action";

export const emptyEventFull: EventFull =
{
    creatorId: '',
    date: new Date(),
    eventType: {
        text: '',
        icon: '',
        avarageDuration: 0,
        isIndoor: false,
        id: ''
    },
    locationId: '',
    maxPers: 0,
    price: 0,
    Action: [],
    location: {
        name: '',
        address: '',
        id: '',
        image: '',
        lat: 0,
        long: 0
    },
    name: '',
    id: '',
    creator: {
        name: '',
        image: '',
        id: '',
        email: '',
        isAdmim: false,
        emailVerified: null,
        EventsCreated:[]
    },
    eventTypeId: '',
}

export const emptyReview: Review = {
    text: '',
    rating: 0,
    imagePublicUrl: null,
    imageBlurHash: null
}