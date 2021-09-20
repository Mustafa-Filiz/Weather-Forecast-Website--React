import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Form, Table } from 'semantic-ui-react';
import axios from 'axios';
import LineChart from './components/LineChart';
import Card from './components/Card';
import SearchArea from './components/SearchArea';


const App = () => {
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [city, setCity] = useState('');
    const [weatherInfo, setWeatherInfo] = useState('');
    const [searchInfo, setSearchInfo] = useState('');

    const fetchLocation = async () => {
        window.navigator.geolocation.getCurrentPosition(position => {
            setLat(position.coords.latitude);
        });
        window.navigator.geolocation.getCurrentPosition(position => {
            setLong(position.coords.longitude);
        });
    };

    const fetchWeatherInfo = async () => {
        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/forecast.json?key=73ed49046fd4425c884172718210709&q=${lat},${long}&days=3&aqi=no&alerts=no`
            );
            setWeatherInfo(response.data);
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        fetchLocation();
        fetchWeatherInfo();
    }, [lat, long]);

    const inputEl = useRef(null);
    const onButtonClick = () => {
        // `current` points to the mounted text input element
        inputEl.current.focus();
    };

    const onInputChange = (e) => {
        setCity(e.target.value);
    };

    const onFormSubmit = () => {
        try {
            axios
            .get(
                `http://api.weatherapi.com/v1/forecast.json?key=73ed49046fd4425c884172718210709&q=${city}&days=3&aqi=no&alerts=no`
            )
            .then((res) => setSearchInfo(res.data));
        } catch (error) {
            console.log(error);
        }

    };

    const info = searchInfo ? searchInfo : weatherInfo;
    const date = new Date(
        info?.location?.localtime_epoch * 1000
    ).toLocaleDateString('en-GB', { dateStyle: 'full' });
    const time = new Date(
        info?.location?.localtime_epoch * 1000
    ).toLocaleTimeString('en-GB', { timeStyle: 'short' });
    const lastUpdated = new Date(
        info?.current?.last_updated_epoch * 1000
    ).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });

    return (
        <div className="App">
            <div className="left-side">
                <SearchArea onFormSubmit={onFormSubmit} onButtonClick={onButtonClick} city={city} inputEl={inputEl} weatherInfo={weatherInfo} onInputChange={onInputChange} />
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
                                {Math.round(info?.current?.temp_c)}{' '}
                                <sup>°C</sup>
                            </p>
                        </div>
                        <p id="description">{info?.current?.condition?.text}</p>
                        <div className="hum-wind">
                            <div className="humidity">
                                <h5>Humidity</h5><div className="line"/>
                                <p>{info?.current?.humidity} %</p>
                            </div>
                            <div className="wind">
                                <h5>Wind Speed</h5><div className="line"/>
                                <p>{info?.current?.wind_kph} km/h</p>
                            </div>
                        </div>
                    </div>
                    <p>Last updated in {lastUpdated}</p>
                </div>
            </div>
            <div className="right-side">
                <LineChart graph={info?.forecast?.forecastday[0]?.hour} />
                <div className="card-container">
                    <Card today="Today" info={info?.forecast?.forecastday[0]} />
                    <Card info={info?.forecast?.forecastday[1]} />
                    <Card info={info?.forecast?.forecastday[2]} />
                </div>
            </div>
        </div>
    );
};

export default App;
