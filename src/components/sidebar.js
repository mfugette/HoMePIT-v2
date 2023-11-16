import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Icon } from '@mui/material';

export default function Sidebar() {
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton href="/pantry">
                        <ListItemText primary={"Pantry"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton href="/recipeBook">
                        <ListItemText primary={"Recipe Book"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton href="/mealPlanner">
                        <ListItemText primary={"Meal Planner"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton href="/shoppingList">
                        <ListItemText primary={"Shopping Lists"} />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon color='action'/>
                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}