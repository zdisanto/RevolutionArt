import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import logo from '../../images/icon.png';
import text from '../../images/title.png';
import useStyles from '../../pages/styles';

const Navbar = () => {
    //const navigate = useNavigate();
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={text} alt="icon" height="45px" />
                <img className={classes.image} src={logo} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                <Button variant="outlined">Add</Button>
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In / Register</Button>
            </Toolbar>
        </AppBar>
  );
};

export default Navbar;