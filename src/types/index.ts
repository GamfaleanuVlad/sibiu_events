import { Prisma } from "@prisma/client";
import { db } from "~/server/db";


const eventWithFull = Prisma.validator<Prisma.EventDefaultArgs>()({
    include: {
        location: true,
        creator: true,
        eventType: true,
        Action:{
            include:{
                creator:true
            }
        }
    }
})
const eventSimple = Prisma.validator<Prisma.EventDefaultArgs>()({})

const locationWithFull = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: {
        Event: {
            include: {
                location: true,
                creator: true,
                eventType: true,
                Action:{
                    include:{
                        creator:true
                    }
                }
            }
        },
        Action : true,
        EvenTypeLocation:{
            include:{
                eventType:true
            }
        }
    }
})
const locationSimple = Prisma.validator<Prisma.LocationDefaultArgs>()({})
const locationWithTypes = Prisma.validator<Prisma.LocationDefaultArgs>()({
    include: {
        EvenTypeLocation:{
            include:{
                eventType:true
            }
        }
    }
})

const eventTypeSimple = Prisma.validator<Prisma.EventTypeDefaultArgs>()({})

const userFull = Prisma.validator<Prisma.UserDefaultArgs>()({
    include: {
        EventsCreated:{
            include:{
                eventType:true,
                location:true
            }
        }
    }
})

export type EventFull = Prisma.EventGetPayload<typeof eventWithFull>
export type EventSimple = Prisma.EventGetPayload<typeof eventSimple>
export type LocationFull = Prisma.LocationGetPayload<typeof locationWithFull>
export type LocationSimple = Prisma.LocationGetPayload<typeof locationSimple>
export type LocationWithTypes = Prisma.LocationGetPayload<typeof locationWithTypes>
export type EventTypeSimple = Prisma.EventTypeGetPayload<typeof eventTypeSimple>
export type UserFull = Prisma.UserGetPayload<typeof userFull>

export const getFullEvent = async (conditions?: Prisma.EventWhereInput): Promise<EventFull | null> => {
    const event = (await db.event.findFirst({
        ...(conditions && { where: conditions }),
        ...eventWithFull
    }))
    return event
}

export const getFullEvents = async (conditions?: Prisma.EventWhereInput): Promise<EventFull[]> => {
    const events = (await db.event.findMany({
        ...(conditions && { where: conditions }),
        ...eventWithFull
    }))
    return events
}

export const getSimpleEvent = async (conditions?: Prisma.EventWhereInput): Promise<EventSimple | null> => {
    const event = (await db.event.findFirst({
        ...(conditions && { where: conditions }),
        ...eventSimple
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

export const getFullLocations = async (conditions?: Prisma.LocationWhereInput): Promise<LocationFull[]> => {
    const locations = (await db.location.findMany({
        ...(conditions && { where: conditions }),
        ...locationWithFull
    }))
    return locations
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

export const getFullLocationsWithTypes = async (conditions?: Prisma.LocationWhereInput): Promise<LocationWithTypes[]> => {
    const locations = (await db.location.findMany({
        ...(conditions && { where: conditions }),
        ...locationWithTypes
    }))
    return locations
}

export const getSimpleEventType = async (conditions?: Prisma.EventTypeWhereInput): Promise<EventTypeSimple | null> => {
    const eventType = (await db.eventType.findFirst({
        ...(conditions && { where: conditions }),
        ...eventTypeSimple
    }))
    return eventType
}

export const getSimpleEventTypes = async (conditions?: Prisma.EventTypeWhereInput): Promise<EventTypeSimple[]> => {
    const eventTypes = (await db.eventType.findMany({
        ...(conditions && { where: conditions }),
        ...eventTypeSimple
    }))
    return eventTypes
}

export const getFullUser = async (conditions?: Prisma.UserWhereInput): Promise<UserFull | null> => {
    const user = (await db.user.findFirst({
        ...(conditions && { where: conditions }),
        ...userFull
    }))
    return user
}

export const getFullUsers = async (conditions?: Prisma.UserWhereInput): Promise<UserFull[]> => {
    const users = (await db.user.findMany({
        ...(conditions && { where: conditions }),
        ...userFull
    }))
    return users
}