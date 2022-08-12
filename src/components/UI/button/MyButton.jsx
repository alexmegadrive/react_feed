import React from 'react';
import classes from './MyButton.module.css'
import PropTypes from 'prop-types';

const MyButton =  ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

MyButton.propTypes = {
    
};

export default MyButton;