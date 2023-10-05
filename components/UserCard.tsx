import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UserFull } from '~/types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image'


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

export default function UserCard({ user, showActions = true }: { user: UserFull, showActions?: boolean }) {
    const [expanded, setExpanded] = useState(false);
    const router = useRouter()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ width: 350, boxShadow: 3 }}>
            <CardHeader
                title={user.name}
                avatar={
                    <Avatar >
                      <Image src={user.image ?? ''} width={100} height={100} alt='user image'/>
                    </Avatar>
                  }
            />
            {
                showActions ?
                    <CardActions disableSpacing>
                        <IconButton onClick={() => void router.push(`/profile/${user.id}`)} aria-label="go to user profile">
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
                    : 
                    <></>
            }
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {user.email}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}