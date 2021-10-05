import React from 'react'

const Card = ({today, info}) => {

    const day = new Date(info?.date_epoch * 1000).toLocaleDateString("en-GB", {dateStyle : "medium"}).slice(0,8)

    return (
        <div className="card">
            <h2>{today ? today : day}</h2>
            <div className="mini-icon"><img src={info?.day?.condition?.icon} alt="icon" /></div>
            <p>Avg. Temp.</p>
            <p style={{fontSize : "1.4rem"}}>{Math.round(info?.day?.avgtemp_c)} <sup>°C</sup></p>
        </div>
    )
}

export default Card
