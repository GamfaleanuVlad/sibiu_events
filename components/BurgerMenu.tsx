import React, { useState } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSession, signOut, signIn } from 'next-auth/react';

interface BurgerMenuProps {
    menuItems: { label: string, onClick: () => void }[];
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ menuItems }) => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    function AuthShowcase() {
        const { data: sessionData } = useSession();

        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-center text-2xl text-black">
                    {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
                </p>
                <button
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
                    onClick={sessionData ? () => void signOut() : () => void signIn()}
                >
                    {sessionData ? "Sign out" : "Sign in"}
                </button>
            </div>
        );
    }

    return (
        <div>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={open} onClose={toggleMenu}>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={index} className='cursor-pointer'>
                            <ListItemText primary={item.label} onClick={() => item.onClick()} />
                        </ListItem>
                    ))}
                    <   ListItem className='cursor-pointer'>
                        <AuthShowcase />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default BurgerMenu;
