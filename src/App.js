import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Form, Table } from 'semantic-ui-react';
import axios from 'axios';
import LineChart from './components/LineChart';
import Card from "./components/Card"


const App = () => {
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [city, setCity] = useState('');
    const [weatherInfo, setWeatherInfo] = useState('');
    const [searchInfo, setSearchInfo] = useState('');

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition((position) =>
            setLat(position?.coords?.latitude)
        );
        window.navigator.geolocation.getCurrentPosition((position) =>
            setLong(position?.coords?.longitude)
        );
        axios
            .get(
                `https://api.weatherapi.com/v1/forecast.json?key=73ed49046fd4425c884172718210709&q=${lat},${long}&days=3&aqi=no&alerts=no
        `
            )
            .then((res) => setWeatherInfo(res?.data));
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
        axios
            .get(
                `http://api.weatherapi.com/v1/forecast.json?key=73ed49046fd4425c884172718210709&q=${city}&days=3&aqi=no&alerts=no`
            )
            .then((res) => setSearchInfo(res.data));
    };

    const info = searchInfo ? searchInfo : weatherInfo;
    const date = new Date(info?.location?.localtime_epoch * 1000).toLocaleDateString("en-GB", {dateStyle : "full"})
    const time = new Date(info?.location?.localtime_epoch * 1000).toLocaleTimeString("en-GB", {timeStyle : "short"})
    const lastUpdated = new Date(info?.current?.last_updated_epoch * 1000).toLocaleString("en-GB", {dateStyle : "medium" , timeStyle : "short"})


    return (
        <div className="App">
            <div className="left-side">
                <Form className="input-form" onSubmit={onFormSubmit}>
                    <Button
                        size="large"
                        content="Your City =>"
                        onClick={onButtonClick}
                    />
                    <Input
                        size="large"
                        value={city}
                        ref={inputEl}
                        placeholder={weatherInfo?.location?.region}
                        onChange={onInputChange}
                    />
                </Form>

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
                            <Table basic="very">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell
                                            style={{ opacity: 0.6 }}
                                        >
                                            Humidity
                                        </Table.HeaderCell>
                                        <Table.HeaderCell
                                            style={{ opacity: 0.6 }}
                                        >
                                            Wind Speed
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell
                                            style={{
                                                fontWeight: 400,
                                                fontSize: '1.2rem',
                                            }}
                                        >
                                            {info?.current?.humidity}
                                        </Table.Cell>
                                        <Table.Cell
                                            style={{
                                                fontWeight: 400,
                                                fontSize: '1.2rem',
                                            }}
                                        >
                                            {info?.current?.wind_kph} km/h
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                    <p>Last updated in {lastUpdated}</p>
                </div>
            </div>
            <div className="right-side">
                <LineChart graph={info?.forecast?.forecastday[0]?.hour} />
                <div className="card-container">
                    <Card day="Today" icon={} temp={} />
                    <Card day={} icon={} temp={} />
                    <Card day={} icon={} temp={} />
                </div>
            </div>
        </div>
    );
};

export default App;
