import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Menu from 'components/Menu';
import dayjs from 'dayjs';
import { useState } from 'react';

/*
            name: req.body.name,
            date: req.body.startDate,
            maxPers: req.body.maxPers,
            price: req.body.price,
*/
export default function CreateEvent() {

    const [cheta, setCheta] = useState<number>();
    const [age, setAge] = useState<number>();

    const marks = [
        {
            value: 0,
            label: '1',
        },
        {
            value: 25,
            label: '2',
        },
        {
            value: 50,
            label: '3',
        },
        {
            value: 75,
            label: '4',
        },
        {
            value: 100,
            label: '5',
        },
    ];
    const valueLabelFormat = (value: number) => {
        return marks.findIndex((mark) => mark.value === value) + 1;
    }


    return (
        <div className='flex flex-col h-[100vh] w-[100vw]  justify-center items-center'>
            <div className='flex flex-col justify-center items-center w-56 gap-2'>
                <TextField id='outlined-basic' label='Name' variant='standard' />
                <MobileDateTimePicker defaultValue={dayjs()} />
                <Slider
                    aria-label='Restricted values'
                    defaultValue={2}
                    valueLabelFormat={valueLabelFormat}
                    step={null}
                    valueLabelDisplay='auto'
                    marks={marks}
                />
                <TextField
                    id="outlined-number"
                    label="Chetă"
                    type="number"
                    value={cheta}
                    onChange={(e) => {
                        var value = parseInt(e.target.value, 10);

                        if (value > 50) value = 50;
                        if (value < 0) value = 0;

                        setCheta(value);
                    }}
                    variant='standard'
                />
                <FormControl fullWidth>

                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        className='w-full'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={(e) => {
                            setAge(parseInt(e.target.value.toString()))
                        }}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Menu></Menu>
        </div>
    );
}