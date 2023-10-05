import { Autocomplete, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, Rating, TextField, Typography } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import { EventFull } from "~/types";
import { useRouter } from "next/router";

export default function AddReview() {

    const router = useRouter()
    const { id } = router.query
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
    const [openThanksDialog, setOpenThanksDialog] = useState(false);

    useEffect(() => {
        void axios.post<{ eventsFull: EventFull[] }>('/api/getEvents').then(res => {
            setEvents(res.data.eventsFull)
        })
    }, [])

    useEffect(() => {
        if (id) {
            setReview(prev => { return { ...prev, event: id as string } })
        }
    },[id])

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
                imagePublicPath = `images/reviews/${uuid()}`

                imageBlurhash = (await axios.post<{ blurHash: string }>('/api/process/image', {
                    sourcePath: `images/reviews/raw/${review.image.name}`,
                    targetPath: imagePublicPath
                })).data.blurHash
            }
        }

        const result = await axios.post('/api/createReviewEvent', {
            creatorId: sessionData?.user?.id,
            targetEventId: review.event,
            text: review.text,
            rating: review.rating,
            imagePublicUrl: imagePublicPath ?? '',
            blurHash: imageBlurhash ?? '',
        })

        if (result.status === 200) {
            setReview({
                event: '',
                text: '',
                rating: 0,
                image: null
            })
            setOpenThanksDialog(true)
        }
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
                                    getOptionLabel={(event) => events.find(e => e.id === event)?.name ?? ''}
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
                            value={review.text}
                            onChange={(event) => {
                                setReview({ ...review, text: event.target.value });
                            }}
                            style={{ width: 500 }}
                        />
                        <InputLabel className="font-bold">Import image</InputLabel>
                        <input type="file" onChange={(event) => { setReview({ ...review, image: event?.target?.files?.[0] ?? null }); }} />

                        {/* <img src={file} /> */}
                        <Button className="button-upload mb-4 self-center" variant="outlined" onClick={() => void submitReview()}>Send review!</Button>
                    </Box>
                </CardContent>
            </Card>
            <Dialog
                open={openThanksDialog}
                onClose={() => setOpenThanksDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Thank you!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Thank you for your feedback!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenThanksDialog(false)} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

