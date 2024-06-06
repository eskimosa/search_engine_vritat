import React from 'react'

import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  BackdropProps: {
    background: 'transparent',
    border: 0
  },
  fixToBottom: {
    marginTop: 'auto',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  }
}));
const LeftMenu = () => {
      const classes = useStyles();
      const [open, setOpen] = React.useState(false);
      const handleDrawer = () => {
        setOpen(!open);
      };
      return (
        <div>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.BackdropProps]: true,
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div style={{marginBottom: "8px"}}></div>
            <div>
              <IconButton onClick={handleDrawer}>
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider/>
            <List>
              <ListItem button component={Link} to="/news_dash">
                <ListItemIcon><DashboardIcon  /></ListItemIcon>
                <ListItemText className='text-[#B96663]' primary="News Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/add_news">
                <ListItemIcon><PostAddIcon /></ListItemIcon>
                <ListItemText className='text-[#B96663]' primary="Fetch News" />
              </ListItem>
            </List>
          </Drawer>
        </div>
      );
};
export default LeftMenu;