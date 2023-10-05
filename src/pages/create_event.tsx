import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import axios from 'axios';
import EmojiDisplay from 'components/EmojiDisplay';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { EventSimple, LocationFull } from '~/types';

const DynamicCreationnMap = dynamic(import('../../components/GeolocationMap'), { ssr: false })

export default function CreateEvent() {

    const [eventToAdd, setEventToAdd] = useState<Omit<EventSimple, 'id'>>({
        name: '',
        date: new Date(),
        maxPers: 0,
        price: 0,
        locationId: '',
        creatorId: '0',
        eventTypeId: '',
    })

    const [locations, setLocations] = useState<LocationFull[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationFull>();

    useState(() => {
        axios.post<{ locationsFull: LocationFull[] }>('/api/getLocations').then(res => {
            setLocations(res.data.locationsFull)
        })
    })

    const marks = [
        {
            value: 0,
            label: '1',
        },
        {
            value: 10,
            label: '2',
        },
        {
            value: 20,
            label: '3',
        },
        {
            value: 30,
            label: '4',
        },
        {
            value: 40,
            label: '5',
        },
        {
            value: 50,
            label: '6',
        },
        {
            value: 60,
            label: '7',
        },
        {
            value: 70,
            label: '8',
        },
        {
            value: 80,
            label: '9',
        },
        {
            value: 90,
            label: '10',
        },
    ];
    const valueLabelFormat = (value: number) => {
        return marks.findIndex((mark) => mark.value === value) + 1;
    }


    return (
        <div className='flex flex-col md:flex-row w-[100vw] justify-start items-center gap-10'>
            <div className='flex flex-col justify-start items-start m-10 w-[16rem] gap-2 '>
            <h1 className="mb-6 text-3xl font-bold inline-block whitespace-nowrap rounded-[0.27rem] bg-green-300 ">CREATE AN EVENT </h1>
                <TextField
                    label='Name'
                    variant='standard'
                    value={eventToAdd?.name}
                    onChange={(e) => {
                        setEventToAdd(prev => { return { ...prev, name: e.target.value } });
                    }} />
                <InputLabel className='font-semibold italic underline'>Date:</InputLabel>
                <MobileDateTimePicker
                    defaultValue={dayjs()}
                    value={dayjs(eventToAdd.date)}
                    onChange={(e) => {
                        setEventToAdd(prev => { return { ...prev, date: e?.toDate() ?? new Date() } })
                    }} />
                <InputLabel className='font-bold italic underline '>Max number of persons:</InputLabel>
                <Slider
                    aria-label='Restricted values'
                    valueLabelFormat={valueLabelFormat}
                    step={null}
                    valueLabelDisplay='auto'
                    marks={marks}
                    value={eventToAdd.maxPers}
                    onChange={(e, value) => {
                        setEventToAdd(prev => { return { ...prev, maxPers: value as number } });
                    }}
                />
                <InputLabel className='font-bold italic underline ' >Aproximate entry fee: </InputLabel>
                <TextField
                    id="outlined-number"
                    label="Fee"
                    type="number"
                    value={eventToAdd.price}
                    onChange={(e) => {
                        var value = parseInt(e.target.value, 10);

                        if (value > 50) value = 50;
                        if (value < 0) value = 0;

                        setEventToAdd(prev => { return { ...prev, price: value } });
                    }}
                    variant='standard'
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Location</InputLabel>
                    <Select
                        className='w-full'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedLocation?.id}
                        label="Location"
                        onChange={(e) => {
                            setSelectedLocation(locations.find(l => l.id === e.target.value));
                            setEventToAdd(prev => { return { ...prev, locationId: e.target.value } });
                        }}
                    >
                        {
                            locations.map(l => (
                                <MenuItem key={l.id} value={l.id}>{l.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        disabled={!selectedLocation}
                        className='flex w-full'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={eventToAdd.eventTypeId}
                        label="Location"
                        onChange={(e) => {
                            setEventToAdd(prev => { return { ...prev, eventTypeId: e.target.value } });
                        }}
                    >
                        {
                            selectedLocation?.EvenTypeLocation.map(type => (
                                <MenuItem key={type.eventType.id} value={type.eventType.id} >
                                    <div className='flex gap-2'>
                                        <EmojiDisplay unicodeString={type.eventType.icon} />
                                        {type.eventType.text}
                                    </div>
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Button 
                    variant='contained'
                    className='text-black hover:text-gray-100  bg-neutral-300 self-center top-10 items-center'
                    onClick={async () => {
                        void await axios.post('/api/createEvent', {...eventToAdd, maxPers:valueLabelFormat(eventToAdd.maxPers)});
                        setEventToAdd({
                            name: '',
                            date: new Date(),
                            maxPers: 0,
                            price: 0,
                            locationId: '',
                            creatorId: '0',
                            eventTypeId: '',
                        });
                        setSelectedLocation(undefined);
                    }}
                >
                    Create
                </Button>
            </div>
            <div className='flex justify-center items-center w-[90vw] md:w-[70%] h-[60rem] md:h-[90vh] rounded-xl overflow-hidden'>
                <DynamicCreationnMap selectedLocationId={selectedLocation?.id} showTypes={true}  />
            </div>
        </div>
    );
}