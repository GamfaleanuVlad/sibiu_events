import { Prisma } from "@prisma/client";
import { db } from "~/server/db";


const eventWithFull = Prisma.validator<Prisma.EventDefaultArgs>()({
    include: {
        location: true,
        creator: true
    }
})

const locationWithFull = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: {
        Event: true,
        Action : true,
        eventTypes: true
    }
})

const locationSimple = Prisma.validator<Prisma.LocationDefaultArgs>()({})
const locationWithTypes = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: {
        eventTypes: true
    }
})


export type EventFull = Prisma.EventGetPayload<typeof eventWithFull>
export type LocationFull = Prisma.LocationGetPayload<typeof locationWithFull>
export type LocationSimple = Prisma.LocationGetPayload<typeof locationSimple>
export type LocationWithTypes = Prisma.LocationGetPayload<typeof locationWithTypes>

export const getFullEvent = async (conditions?: Prisma.EventWhereInput): Promise<EventFull | null> => {
    const event = (await db.event.findFirst({
        ...(conditions && { where: conditions }),
        ...eventWithFull
    }))
    return event
}

export const getFullLocation = async (conditions?: Prisma.LocationWhereInput): Promise<LocationFull | null> => {
    const location = (await db.location.findFirst({
        ...(conditions && { where: conditions }),
        ...locationWithFull
    }))
    return location
}

export const getSimpleLocation = async (conditions?: Prisma.LocationWhereInput): Promise<LocationSimple | null> => {
    const location = (await db.location.findFirst({
        ...(conditions && { where: conditions }),
        ...locationSimple
    }))
    return location
}

export const getFullLocationWithTypes = async (conditions?: Prisma.LocationWhereInput): Promise<LocationWithTypes | null> => {
    const location = (await db.location.findFirst({
        ...(conditions && { where: conditions }),
        ...locationWithTypes
    }))
    return location
}