import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      textAlign: 'center',
    },
    avatar: {
      color: theme.palette.getContrastText(indigo[500]),
      backgroundColor: indigo[500],
      width: theme.spacing(3),
      height: theme.spacing(3),
      fontSize: 10,
    },
  }));


export default function AvatarList() {
    const classes = useStyles();
  
    return (
      <div>
        <ListItem>
          <ListItemIcon>
            <Avatar alt="Your Name" className={classes.avatar}>YN</Avatar>
          </ListItemIcon>
          <ListItemText primary="Your Name" />
        </ListItem>
      </div>
    );
  }