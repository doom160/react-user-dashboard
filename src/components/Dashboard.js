import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './ListItems';
import InputAdornment from '@material-ui/core/InputAdornment';
import AvatarList from './AvatarList';
import EmployeeTable from './EmployeeTable';
import FileUpload from './FileUpload';

const axios = require('axios');

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <br/>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const colHeader = [
  { title: "Id", field: "id" },
  { title: "Name", field: "name" },
  { title: "Login", field: "login" },
  { title: "Salary", field: "salary", type: "currency" }
];

const MemoizedEmployeeTable = React.memo(EmployeeTable);
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  input: {
    display: 'none',
  },
}));

function UserInput({ type, label /*...*/ }) {
  const [value, setValue] = React.useState("");
  const input = <TextField value={value} onChange={e => setValue(e.target.value)} type={type} label={label} InputProps={{startAdornment: (
    <InputAdornment position="start">
      <AttachMoneyIcon />
    </InputAdornment>
  ),}}/>;

  return [value, input];
}



export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [selectedFile, setFile] = React.useState({ file: null, fileName: null});
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onUploadFile = () => {
    // Create an object of formData
    const formData = new FormData();
  
    // Update the formData object
    formData.append('file',selectedFile);
    formData.append('name',selectedFile.name);
  
    // Request made to the backend api
    // Send formData object
    axios.post(process.env.REACT_APP_BACKEND_URL + '/users/upload', formData, {
      headers: {'Content-Type': 'application/csv'}
    }).then(function (response) {
      console.log(response.status);
    }).catch(function (error) {
      console.log(error.status);
    });
  }

  const onFileChange = event => {
    // Update the state
   // console.log(event.target.files[0]);
    setFile({file: event.target.files[0], fileName: event.target.files[0].name });
  }

  
  const [minSalary, minSalaryInput] = UserInput({ type: "text", label: "Min Salary" });
  const [maxSalary, maxSalaryInput] = UserInput({ type: "text", label: "Max Salary" });
  /*const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight); */
  const [filterValue, updateTableValue] = React.useState({minSalaryValue:0, maxSalaryValue:999999});
  const updateTable = () => {
    updateTableValue({minSalaryValue: minSalary,maxSalaryValue: maxSalary});
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><AvatarList/></List>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1} alignItems="flex-end">
                  <FileUpload/>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    {minSalaryInput}
                  </Grid>
                  <Grid item>
                    {maxSalaryInput}
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={updateTable}>
                      Filter
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <MemoizedEmployeeTable minSalary={filterValue.minSalaryValue} maxSalary={filterValue.maxSalaryValue} />
            </Grid>
          </Grid>
          <Box pt={4}>
            {Copyright}
          </Box>
        </Container>
      </main>
    </div>
  );
}