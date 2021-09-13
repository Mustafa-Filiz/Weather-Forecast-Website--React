import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Form } from 'semantic-ui-react';
import axios from 'axios';

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
                `https://api.weatherapi.com/v1/forecast.json?key=73ed49046fd4425c884172718210709&q=${lat},${long}&days=4&aqi=no&alerts=no
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
                `http://api.weatherapi.com/v1/forecast.json?key=73ed49046fd4425c884172718210709&q=${city}&days=4&aqi=no&alerts=no`
            )
            .then((res) => setSearchInfo(res.data));
    };

    return (
        <div>
            <Form onSubmit={onFormSubmit}>
                <Button content="Your City =>" onClick={onButtonClick} />
                <Input
                    value={city}
                    ref={inputEl}
                    placeholder={weatherInfo?.location?.region}
                    onChange={onInputChange}
                />
            </Form>

            <p>{searchInfo ? searchInfo?.location?.region : weatherInfo?.location?.region}</p>
            <p>{searchInfo ? searchInfo?.location?.country : weatherInfo?.location?.country}</p>
        </div>
    );
};

export default App;
