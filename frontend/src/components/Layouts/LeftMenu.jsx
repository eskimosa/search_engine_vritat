import React from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import clsx from 'clsx';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link } from 'react-router-dom';
import ArchiveIcon from '@mui/icons-material/Archive';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const DrawerHeader = (props) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: props.theme.spacing(0, 1),
    ...props.theme.mixins.toolbar,
  }}>
    {props.children}
  </div>
);

const LeftMenu = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
          }),
          ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
          }),
        }}
      >
        <DrawerHeader theme={theme}>
          <IconButton onClick={handleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button component={Link} to="/news_dash">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText className='text-[#B96663]' primary="News Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/add_news">
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText className='text-[#B96663]' primary="Fetch News" />
          </ListItem>
          <ListItem button component={Link} to="/archived_news">
            <ListItemIcon>
              <ArchiveIcon />
            </ListItemIcon>
            <ListItemText className='text-[#B96663]' primary="Archived News" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <LeftMenu />
  </ThemeProvider>
);

export default App;
