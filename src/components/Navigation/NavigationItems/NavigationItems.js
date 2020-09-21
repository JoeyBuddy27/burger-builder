import React from 'react';
// import {Route, Link} from 'react-router-dom';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem  link="/"> Burger Builder</NavigationItem>
        {props.isAuthenticated ?
        <NavigationItem link="/orders"> Orders</NavigationItem> : null }
       { props.isAuthenticated
       	?  <NavigationItem link="/logout"> Logout </NavigationItem> 
       	: <NavigationItem link="/auth"> Register / Sign in </NavigationItem> }
    </ul>
);

export default navigationItems;