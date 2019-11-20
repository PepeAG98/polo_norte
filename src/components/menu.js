import React, { Component, setState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { decorator } from '@babel/types';
import '../App.css';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
const cookies = new Cookies();

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    title: {
        flexGrow: 1,
        marginLeft: 10
    }
  });

export default function Menu(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <ChildCareIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Cartas" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Cartas" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TrendingFlatIcon />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List component="nav" aria-label="main mailbox folders">
        <Link to="children-list"><ListItem button>
          <ListItemIcon>
            <ChildCareIcon />
          </ListItemIcon>
          <ListItemText primary="Niños" />
        </ListItem></Link>
        <Link to="letter-list"><ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Cartas" />
        </ListItem></Link>
        <Link to="/dashboard"><ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem></Link>
        {cookies.get('isLogin') ?<ListItem button onClick={SignOut}>
          <ListItemIcon>
            <TrendingFlatIcon />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItem>: ''}
      </List>
      <Divider />
    </div>
  );

  function SignOut() {
    cookies.set('isLogin', 'false', { path: '/' });
    //props.history.push('/');
  }

    return(
        <AppBar position="static">
            <Toolbar>
                <Hidden lgUp>
                    <Icon edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('top', true)}>
                    menu
                    </Icon>
                </Hidden>
                <Typography variant="h6" className={classes.title}>
                Santa App
                </Typography>
                <Hidden mdDown>
                    <Link to="/dashboard"><Button startIcon={<DashboardIcon/>} color="inherit">Dashboard</Button></Link>
                    <Link to="/children-list"><Button startIcon={<ChildCareIcon/>} color="inherit">Niños</Button></Link>
                    <Link to="/letter-list"><Button startIcon={<AssignmentIcon/>} color="inherit">Cartas</Button></Link>
                    {cookies.get('isLogin') ? <Button startIcon={<TrendingFlatIcon/>} onClick={SignOut} color="inherit">Salir</Button>: ''}
                </Hidden>
                
            </Toolbar>
            <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="top"
        open={state.top}
        onClose={toggleDrawer('top', false)}
        onOpen={toggleDrawer('top', true)}
      >
        {fullList('top')}
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer('bottom', false)}
        onOpen={toggleDrawer('bottom', true)}
      >
        {fullList('bottom')}
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {sideList('right')}
      </SwipeableDrawer>
        </AppBar>
    );
}