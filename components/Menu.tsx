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
import { useRouter } from 'next/router';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <MenuItem onClick={() => void router.push("/")}>Map</MenuItem>
        <MenuItem onClick={() => void router.push("/find_event")}>Find event</MenuItem>
        <MenuItem onClick={() => void router.push("/create_event")}>Create event</MenuItem>
        <MenuItem onClick={() => void router.push("/create_review")}>Review</MenuItem>
        <MenuItem onClick={() => void router.push("/report")}>Report</MenuItem>
        <MenuItem onClick={() => void router.push("/support")}>Support</MenuItem>
        <MenuItem onClick={() => void router.push("/about")}>About</MenuItem>
      </Box>
    </>
  );
}

