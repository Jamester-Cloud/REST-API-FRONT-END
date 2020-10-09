import React from 'react'
import './Styles/PageError.css';

export default function PageError(props) {
    return (
        <div className="PageError text-primary">
            <h3>{props.errors.message}, Please try again later</h3>
        </div> 
    )
}
