import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import axios from 'axios'
import EventCard from 'components/EventCard'
import ReviewCard from 'components/ReviewCard'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ActionEvent, EventFull } from '~/types'
import { Review } from '~/types/action'
import { emptyEventFull } from '~/utils/empty'


const EventPage = () => {

    const router = useRouter()
    const { id } = router.query

    const [event, setEvent] = useState<EventFull>()
    const [reviews, setReviews] = useState<ActionEvent[]>([])


    useEffect(() => {
        if (id) {
            void axios.post<{ eventFull: EventFull | null }>('/api/getEvent', {
                eventId: id
            }).then(res => {
                setEvent(res.data.eventFull ?? emptyEventFull)
            })

            void axios.post<{ eventReviews: ActionEvent[] }>('/api/getEventReviews', {
                targetEventId: id
            }).then(res => {
                setReviews(res.data.eventReviews)
            })
        }
    }, [id])

    return (
        <div className='flex flex-col gap-4'>
            {event && (
                <>
                    <Typography>
                        {event.name}
                    </Typography>
                    <EventCard event={event} showActions={false} />
                </>
            )}
            <div className='flex flex-col gap-4'>
                <Button
                    variant='outlined'
                    color='info'
                    onClick={() => { void router.push(`/review/${event?.id}`) }}>
                    Add Review
                </Button>
            </div>
            <div className='flex flex-col gap-4'>
                {
                    reviews.map(review => {
                        return (
                            <ReviewCard key={review.id} action={review} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EventPage