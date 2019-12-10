import React from 'react'
import classes from '../ListCity/ListCity.module.css'

const ListCity = (props) => {
    return (
        <div className={classes.ListCity} onClick={props.onClick}>
            {props.children}
        </div>
    )
}
export default ListCity