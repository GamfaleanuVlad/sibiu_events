import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import EventCard from './EventCard';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const goHome = () => {
        window.location.href = "/"
    };
    const findEvent = () => {
        // window.location.href = "/"
    };
    const createEvent = () => {
        window.location.href = "/create_event"
    };
    const createReview = () => {
        window.location.href = "/create_review"
    };
    const report = () => {
        window.location.href = "/report"
    };
    const askForSupport = () => {
        window.location.href = "/support"
    };
    const findAdditionalInfo = () => {
        window.location.href = "/about"
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <MenuItem onClick={goHome}>Map</MenuItem>
                <MenuItem onClick={findEvent}>Find event</MenuItem>
                <MenuItem onClick={createEvent}>Create event</MenuItem>
                <MenuItem onClick={createReview}>Review</MenuItem>
                <MenuItem onClick={report}>Report</MenuItem>
                <MenuItem onClick={askForSupport}>Support</MenuItem>
                <MenuItem onClick={findAdditionalInfo}>About</MenuItem>
            </Box>
        </React.Fragment>
    );
}
