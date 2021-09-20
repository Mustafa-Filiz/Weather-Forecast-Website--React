import React from 'react';

const ResultArea = ({ info, date, time, lastUpdated }) => {
    return (
        <div className="info-container">
            <div className="city-info">
                <p>
                    {info?.location?.region} / {info?.location?.country}
                </p>
                <p>{date}</p>
                <p>{time}</p>
            </div>
            <div className="weather-info">
                <div className="icon">
                    <img
                        src={info?.current?.condition?.icon}
                        alt="weather-icon"
                    />
                    <p>
                        {Math.round(info?.current?.temp_c)} <sup>°C</sup>
                    </p>
                </div>
                <p id="description">{info?.current?.condition?.text}</p>
                <div className="hum-wind">
                    <div className="humidity">
                        <h5>Humidity</h5>
                        <div className="line" />
                        <p>{info?.current?.humidity} %</p>
                    </div>
                    <div className="wind">
                        <h5>Wind Speed</h5>
                        <div className="line" />
                        <p>{info?.current?.wind_kph} km/h</p>
                    </div>
                </div>
            </div>
            <p>Last updated in {lastUpdated}</p>
        </div>
    );
};

export default ResultArea;
