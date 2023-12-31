import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import axios from 'axios';
import EventCard from 'components/EventCard';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react'
import { EventFull } from '~/types';
import MiniSearch from 'minisearch'

function FindEvent() {


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
    const [minisearch, setMinisearch] = useState<MiniSearch<EventFull>>()

    useEffect(() => {
        void axios.post<{ eventsFull: EventFull[] }>('/api/getEvents').then(res => {
            setEvents(res.data.eventsFull)
            const miniSearch = new MiniSearch<EventFull>({
                fields: ['name'],
                storeFields: ['id'],
                searchOptions: {
                    fuzzy: 3
                }
            })
            miniSearch?.addAll(res.data.eventsFull)
            setMinisearch(miniSearch)
        })
    }, [])

    useEffect(() => {
        console.log(minisearch?.documentCount);

        console.log(minisearch?.search(searchCriteria.text));

    }, [searchCriteria])


    return (
        <div className='flex flex-row gap-4'>
            <div className='flex flex-col gap-2'>
                <h1 className="mb-6 text-3xl font-bold inline-block whitespace-nowrap rounded-[0.27rem] bg-green-300 ">FIND AN EVENT</h1>
                <TextField
                    label='Search...'
                    variant='standard'
                    value={searchCriteria?.text}
                    onChange={(e) => {
                        setSearchCriteria(prev => { return { ...prev, text: e.target.value } });
                    }} />
                <div>
                    <InputLabel className='font-bold italic underline'>Date:</InputLabel>
                    <MobileDateTimePicker
                        defaultValue={dayjs()}
                        value={dayjs(searchCriteria.date)}
                        onChange={(e) => {
                            setSearchCriteria(prev => { return { ...prev, date: e?.toDate() ?? new Date() } })
                        }} />
                </div>
                <div>

                </div>
            </div>
            <div className='grid gap-4 grid-cols-4 grid-rows-3'>

                {
                    (
                        searchCriteria.text.length > 0
                            ? events.filter(event => minisearch?.search(searchCriteria.text).some(item => item.id === event.id))
                            : [...events]
                    )
                        .filter(searchItem => {
                            if (searchCriteria.indoor !== null) {
                                return searchItem.eventType.isIndoor === searchCriteria.indoor
                            }
                            return true
                        })
                        .filter(searchItem => {
                            if (searchCriteria.fee !== null) {
                                return searchItem.price === searchCriteria.fee
                            }
                            return true
                        })
                        .filter(searchItem => {
                            if (searchCriteria.date !== null) {
                                return dayjs(searchItem.date).isAfter(searchCriteria.date)
                            }
                            return true
                        })
                        .map(searchItem => (
                            <EventCard key={searchItem.id} event={searchItem} />
                        ))}
            </div>
        </div>
    )
}

export default FindEvent