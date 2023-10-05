import * as React from 'react';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Review } from '~/types/action';
import { ActionEvent } from '~/types';
import { useEffect, useState } from 'react';
import { emptyReview } from '~/utils/empty';
import { publicR2URL } from '~/utils/r2';
import Image from 'next/image'
import blurHashToDataURL from '~/utils/blurhash';
import Rating from '@mui/material/Rating';

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

export default function ReviewCard({ action }: { action: ActionEvent }) {
    const [expanded, setExpanded] = useState(false);

    const [review, setReview] = useState<Review>(emptyReview)

    useEffect(() => {
        setReview(JSON.parse(action.text ?? '{}') as Review)
    }, [])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 400, width: 400, boxShadow: 3 }}>
            <CardHeader
                title={action.creator?.name}

            />
            <CardContent >
                {
                    (review.rating && review.rating > 0) ?
                        <Rating
                            readOnly 
                            name="simple-controlled"
                            value={review.rating}
                        />
                        :
                        <></>
                }
                {
                    (review.text && review.text.length > 0) ?
                        <div className='flex w-full h-full bg-slate-100 rounded p-2'>
                            <Typography paragraph>
                                {review.text}
                            </Typography>
                        </div>
                        :
                        <div className='flex w-full h-full bg-slate-100 rounded p-2'>
                            Attended this event
                        </div>
                }
            </CardContent>
            {
                review.imagePublicUrl && review.imagePublicUrl.length > 0 &&
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
            }
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {
                        review.imagePublicUrl && review.imagePublicUrl.length > 0 &&
                        <div className='flex justify-center items-center w-full h-full'>
                            <div className='relative w-[300px] h-[300px] flex justify-center items-center'>
                                <Image className='object-cover'
                                    src={`${publicR2URL(review.imagePublicUrl)}.webp`}
                                    blurDataURL={review.imageBlurHash ? blurHashToDataURL(review.imageBlurHash, 16, 16) : undefined}
                                    alt=''
                                    fill
                                />
                            </div>
                        </div>
                    }
                </CardContent>
            </Collapse>
        </Card>
    );
}