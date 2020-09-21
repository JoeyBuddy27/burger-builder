import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../Auxillary/Auxillary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';



class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <Aux>
                <Toolbar 
                drawerToggleClicked={this.sideDrawerToggleHandler}
                isAuth = {this.props.isAuthenticated} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuth = {this.props.isAuthenticated} />
                    <div className={classes.Page}>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null //if token is not null, user is autheticated
    };
};

export default connect(mapStateToProps)(Layout);