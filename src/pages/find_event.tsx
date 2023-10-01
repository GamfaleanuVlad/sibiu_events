import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import axios from 'axios';
import EventCard from 'components/EventCard';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react'
import { EventFull } from '~/types';
import Fuse from 'fuse.js'

function FindEvent() {
    const fuseOptions: Fuse.IFuseOptions<EventFull> = {
        keys: ['name', 'location.name', 'eventType.text']
    }

    const [searchCriteria, setSearchCriteria] = useState<{
        text: string,
        date: Date | null,
        indoor: boolean | null,
        fee: number | null,
    }>({
        text: '',
        date: null,
        indoor: null,
        fee: null,
    })

    const [events, setEvents] = useState<EventFull[]>([])
    const [fuse, setFuse] = useState<Fuse<EventFull>>()
    
    useEffect(() => {
        axios.post<{ eventsFull: EventFull[] }>('/api/getEvents', searchCriteria).then(res => {
            setEvents(res.data.eventsFull)
        })
    })

    useEffect(() => {
        setFuse(new Fuse<EventFull>(events, fuseOptions))
    }, [events])

    return (
        <div>
            <div>
                <TextField
                    label='Search...'
                    variant='standard'
                    value={searchCriteria?.text}
                    onChange={(e) => {
                        setSearchCriteria(prev => { return { ...prev, text: e.target.value } });
                    }} />
                <InputLabel>Date</InputLabel>
                <MobileDateTimePicker
                    defaultValue={dayjs()}
                    value={dayjs(searchCriteria.date)}
                    onChange={(e) => {
                        setSearchCriteria(prev => { return { ...prev, date: e?.toDate() ?? new Date() } })
                    }} />
            </div>
            <div className='flex flex-col min-h-screen'>
                {
                    fuse
                        ?.search(searchCriteria.text)
                        .filter(fuseItem => {
                            if (searchCriteria.indoor !== null) {
                                return fuseItem.item.eventType.isIndoor === searchCriteria.indoor
                            }
                            return true
                        })
                        .filter(fuseItem => {
                            if (searchCriteria.fee !== null) {
                                return fuseItem.item.price === searchCriteria.fee
                            }
                            return true
                        })
                        .filter(fuseItem => {
                            if (searchCriteria.date !== null) {
                                return dayjs(fuseItem.item.date).isAfter(searchCriteria.date)
                            }
                            return true
                        })
                        .map(fuseItem => (
                            <EventCard key={fuseItem.item.id} event={fuseItem.item} />
                        ))}
            </div>
        </div>
    )
}

export default FindEvent