import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabled}>-</button>
        <button 
            className={[classes.More, classes[props.moreType]].join(' ')}
            onClick={props.added}
            disabled = {props.disabledMore}
            >+</button>
        <p 
        className = {[classes.Total, classes[props.btnType]].join(' ')}
        > {props.total} </p>
    </div>
);

export default buildControl;

