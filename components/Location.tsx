import React, { useEffect, useState } from 'react'
import EventCard from './EventCard'
import LocationCard from './LocationCard'
import { EventFull, LocationWithTypes } from '~/types'
import axios from 'axios'

interface Props {
    id: string
}

const Location = ({ id }: Props) => {

    const [location, setLocation] = useState<LocationWithTypes>({} as LocationWithTypes)
    const [events, setEvents] = useState<EventFull[]>([])


    console.log(id);
    useEffect(() => {
    console.log(id);
        axios.post<{ locationsWithTypes: LocationWithTypes }>('/api/getLocation', {
            id: id
        }).then(res => {
            console.log(res.data.locationsWithTypes);
            
            setLocation(res.data.locationsWithTypes)
        }).catch(e => {
            console.log(e);
        })

        axios.post<{ eventsFull: EventFull[] }>('/api/getEventsAtLocation', {
            locationId: id
        }).then(res => {
            setEvents(res.data.eventsFull)
        })
    }, [id])


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '2rem',
            paddingTop: '1rem'
        }}>
            <LocationCard location={location} />
            {
                events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))
            }

        </div>
    )
}



export default Location