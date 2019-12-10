import React from 'react'
import classes from '../Info/Info.module.css'

const Info = (props) => {
    return (
        <div className={classes.Info}>
            {/* <p>Город: {props.city} </p> */}
            <p>Температура: {props.temp} C<sup>o</sup> </p>
            <p>Влажность: {props.humidity}% </p>
            <p> {props.rainfall} </p>
            <i className={props.class}/>
        </div>
    )
}
export default Info;