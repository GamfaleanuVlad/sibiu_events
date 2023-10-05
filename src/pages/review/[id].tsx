import { Autocomplete, Box, Button, Card, CardContent, InputLabel, Rating, TextField, Typography } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import { EventFull } from "~/types";

export default function AddReview() {

    const { data: sessionData } = useSession();

    const [review, setReview] = useState<{
        event: string,
        text: string | null,
        rating: number | null,
        image: File | null
    }>({
        event: '',
        text: '',
        rating: 0,
        image: null
    })

    const [events, setEvents] = useState<EventFull[]>([])

    useEffect(() => {
        axios.post<{ eventsFull: EventFull[] }>('/api/getEvents').then(res => {
            setEvents(res.data.eventsFull)
        })
    }, [])

    const submitReview = async () => {

        let imagePublicPath = null
        let imageBlurhash = null

        if (review.image) {
            const { data: { clientUrl } } = await axios.post<{ clientUrl: string }>(`/api/r2/presignedURL`, {
                path: 'images/reviews/raw',
                filename: review.image.name,
                filetype: review.image.type,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const result = await axios.put(clientUrl, review.image, {
                headers: {
                    'Content-Type': review.image.type,
                },
            });

            if (result.status === 200) {
                imagePublicPath = `/images/reviews/${uuid()}`

                imageBlurhash = (await axios.post<{ blurhash: string }>('/api/process/image', {
                    sourcePath: `images/reviews/raw/${review.image.name}`,
                    targetPath: imagePublicPath
                })).data.blurhash
            }
        }
        return null;
    };

    return (
        <div className="review flex flex-col items-center justify-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">Reviews page</h1>
            <Card variant="outlined" sx={{ minWidth: 500 }}>
                <CardContent>
                    <Box
                        className="flex flex-col"
                        sx={{
                            "& > legend": { mt: 2 },
                        }}
                    >
                        {
                            events.length > 0 &&
                            <>
                                <InputLabel className="font-bold">Choose the event</InputLabel >
                                <Autocomplete
                                    className="mb-5"
                                    disablePortal
                                    onChange={(_, selectedValue) => {
                                        setReview({ ...review, event: selectedValue ?? '' });
                                    }}
                                    value={review.event}
                                    options={[...events.map(event => event.id)]}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Event" />}
                                />
                            </>
                        }
                        <InputLabel className="font-bold">
                            Add your rating here
                        </InputLabel>
                        <Rating
                            name="simple-controlled"
                            value={review.rating}
                            onChange={(_, newValue) => {
                                setReview({ ...review, rating: newValue ?? 0 });
                            }}
                        
                        />
                        <InputLabel className="font-bold">Describe your experience regarding the event</InputLabel>
                        <TextField
                             id="filled-multiline-flexible"
                             label="Describe your experience regarding the event"
                             multiline
                             variant="filled"
                             style={{ width: 500 }}
                        />
                        <InputLabel className="font-bold">Import image</InputLabel>
                        <input type="file" onChange={(event) => { setReview({ ...review, image: event?.target?.files?.[0] ?? null }); }} />

                        {/* <img src={file} /> */}
                        <Button className="button-upload mb-4 self-center" variant="outlined" onClick={() => submitReview()}>Send review!</Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

