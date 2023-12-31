import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import axios from 'axios';
import EventCard from 'components/EventCard';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react'
import { ActionEvent, EventFull } from '~/types';
import MiniSearch from 'minisearch'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

function Profile() {

    const router = useRouter()
    const { id } = router.query
    const { data: sessionData } = useSession();

    const [createdEvents, setCreatedEvents] = useState<EventFull[]>([])
    const [participatedEvents, setParticipatedEvents] = useState<EventFull[]>([])


    useEffect(() => {

        const searchedId = (id as string) ?? (sessionData?.user?.id ?? '')

        void axios.post<{
            userEvents: {
                createdEventsFull: EventFull[],
                participatedEventsFull: ActionEvent[]
            }
        }>('/api/getUserEvents', { creatorId: id ?? searchedId }).then(res => {
            setCreatedEvents(res.data.userEvents.createdEventsFull)
            setParticipatedEvents(
                res.data.userEvents.participatedEventsFull.map(
                    (action): EventFull => {

                        return {
                            creatorId: action.targetEvent?.creatorId ?? '',
                            date: action.targetEvent?.date ?? new Date(),
                            eventType: action.targetEvent?.eventType ?? {
                                text: '',
                                icon: '',
                                avarageDuration: 0,
                                isIndoor: false,
                                id: ''
                            },
                            locationId: action.targetEvent?.locationId ?? '',
                            maxPers: action.targetEvent?.maxPers ?? 0,
                            price: action.targetEvent?.price ?? 0,
                            Action: action.targetEvent?.Action ?? [],
                            location: action.targetEvent?.location ?? {
                                name: '',
                                address: '',
                                id: '',
                                image: '',
                                lat: 0,
                                long: 0
                            },
                            name: action.targetEvent?.name ?? '',
                            id: action.targetEvent?.id ?? '',
                            eventTypeId: action.targetEvent?.eventTypeId ?? '',
                            creator: action.targetEvent?.creator ?? {
                                name: '',
                                image: '',
                                id: '',
                                email: '',
                                emailVerified: null,
                                isAdmim: false,
                                EventsCreated: []
                            }
                        }
                    }
                )
            )
        })
    }, [sessionData])

    return (
        <div>
            <InputLabel>Created Events</InputLabel>
            <div className='flex flex-col gap-2'>
                {
                    createdEvents.map(event => {
                        return (
                            <EventCard key={event.id} event={event} />
                        )
                    })
                }
            </div>
            <InputLabel>Participated Events</InputLabel>
            <div className='flex flex-col gap-2'>
                {
                    participatedEvents.map(event => {
                        return (
                            <EventCard key={event.id} event={event} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile