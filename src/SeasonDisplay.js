import './SeasonDisplay.scss'
import React from 'react';

// config object, good best practice to seperate this from the main function so it's easy to change
const seasonConfig = {
    Summer: {text: 'mmmm' , iconText: 'sun'},
    Winter: {text: 'frosty nips', iconText:'snowflake'}
}

// get season returns the season as a string based on hemisphere and the current month
const getSeason = (lat=Number, month=Number) => {
    if(lat>=0){
        return month>=3 && month<=8 ? "Summer" : "Winter"
    } else {
        return month>=3 && month<=8 ? "Winter" : "Summer"
    }
}

const SeasonDisplay = (props) => {
    const season = getSeason(props.lat, props.monthInt)

    // extracted some logic outside jsx so that it's easier to read
    const config = seasonConfig[season]

    return (
        // make the class name of the root element the name of the component
        <div className={`season-display ${season}`}> 
            <i className={`massive ${config.iconText} icon left-icon`}></i>
            <h1 className="season-text">{config.text}</h1>
            <i className={`massive ${config.iconText} icon right-icon`}></i>
        </div>
    )
}

export default SeasonDisplay