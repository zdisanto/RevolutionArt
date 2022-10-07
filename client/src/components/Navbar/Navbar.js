import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import logo from '../../images/icon.png';
import text from '../../images/TCAG_title_update.png';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <img src={text} alt="icon" height="45px" />
            <img className={classes.image} src={logo} alt="icon" height="40px" />
            <Toolbar className={classes.toolbar}>
                <Button variant="contained" color="primary">Sign In</Button>
            </Toolbar>
        </AppBar>
  );
};

export default Navbar;