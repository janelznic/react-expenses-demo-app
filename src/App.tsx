// prettier-ignore
import { AppBar, Divider, Drawer as DrawerMui, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, withWidth } from "@material-ui/core";
import { Theme } from '@material-ui/core/styles';
import { isWidthUp, WithWidth } from '@material-ui/core/withWidth';
import AttachMoney from '@material-ui/icons/AttachMoney';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Router } from 'react-router-dom';
import { history } from './configureStore';
import { Record } from './Interfaces';
import { AccountPage, HomePage } from './Pages';
import { RootState } from './Reducers';
import withRoot from './withRoot';

function Routes() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Route exact={true} path="/" component={HomePage} />
      <Route exact={true} path="/home" component={HomePage} />
      <Route exact={true} path="/account" component={AccountPage} />
    </div>
  );
}

function Drawer() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.drawerHeader} />
      <Divider />
      <List>
        <ListItem button onClick={() => history.push('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push('/account')}>
          <ListItemIcon>
            <AttachMoney />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
      </List>
    </div>
  );
}

interface Props extends RouteComponentProps<void>, WithWidth {
  record: Record[];
}

function App(props?: Props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(true);

  if (!props) {
    return null;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router history={history}>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap={isWidthUp('sm', props.width)}>
                List of expenses / incomes sorted by category
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <DrawerMui
              variant="temporary"
              anchor={'left'}
              open={mobileOpen}
              classes={{
                paper: classes.drawerPaper
              }}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              <Drawer />
            </DrawerMui>
          </Hidden>
          <Hidden smDown>
            <DrawerMui
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <Drawer />
            </DrawerMui>
          </Hidden>
          <Routes />
        </div>
      </div>
    </Router>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'absolute'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%'
    }
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  }
}));

function mapStateToProps(state: RootState) {
  return {
    recordList: state.recordList
  };
}

export default connect(mapStateToProps)(withRoot(withWidth()(App)));
