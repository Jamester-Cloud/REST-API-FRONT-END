import React from 'react'
import './Styles/PageError.css';

export default function PageError(props) {
    return (
        <div className="PageError">
            <h3>{props.errors.message}</h3>
        </div> 
    )
}
