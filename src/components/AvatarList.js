import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'block',
      textAlign: 'center',
    },
    avatar: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));


export default function AvatarList() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Box align="center">
          <Avatar alt="Your Name" className={classes.avatar}>YN</Avatar>
        </Box>
        <Typography variant="h6">
          Your Name
        </Typography>
      </div>
    );
  }