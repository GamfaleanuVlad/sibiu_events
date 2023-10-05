import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EventFull, EventSimple } from '~/types';
import EmojiDisplay from './EmojiDisplay';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import { useRouter } from 'next/router';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function EventCard({ event, showActions = true } : { event: EventFull, showActions?: boolean }) {

    const router = useRouter()
    const [expanded, setExpanded] = useState(false);
    const { data: sessionData } = useSession();
    const [attendingAdd, setAttendingAdd] = useState(0);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 400, width: 400, boxShadow: 3 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <EmojiDisplay unicodeString={event.eventType.icon} />
                    </Avatar>
                }
                action={
                    showActions ?
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        :
                        <></>
                }
                title={event.eventType.text}
                subheader={event.location.name}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary" className='flex flex-col'>
                    <div>On: {dayjs(event.date).format('dddd, DD MMM')}</div>
                    <div>At: {dayjs(event.date).format('hh:mm a')}</div>
                    <div>Attending: {((event.Action.filter(action => action.type === 'register').length) + attendingAdd ).toString()}</div>
                </Typography>
            </CardContent>
            {
                showActions &&
                <>
                    <CardActions disableSpacing>
                        <IconButton onClick={() => {
                            if (sessionData) {
                                void axios.post('/api/registerToEvent', {
                                    creatorId: sessionData.user.id,
                                    targetEventId: event.id,
                                })
                                setAttendingAdd(attendingAdd + 1)
                            }
                        }} aria-label="register">
                            <AddIcon />
                        </IconButton>
                        <IconButton onClick={() => void router.push(`/event/${event.id}`)} aria-label="go to event">
                            <ArrowOutwardIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                </>
            }
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Created by:</Typography>
                    <UserCard user={event.creator} />
                </CardContent>
            </Collapse>
        </Card>
    );
}
