import React from 'react';
import './Loading.scss'

const Error = (props) => {

    return (
        <div class="ui active">
            <div class="text">{props.message}</div>
        </div>
    )
}

export default Error