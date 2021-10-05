import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LineChart from './components/LineChart';
import Card from './components/Card';
import SearchArea from './components/SearchArea';
import ResultArea from './components/ResultArea';
import LoadingPage from './components/LoadingPage';

const App = () => {
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [city, setCity] = useState('');
    const [weatherInfo, setWeatherInfo] = useState('');
    const [searchInfo, setSearchInfo] = useState('');

    const success = async (pos) => {
        const coordination = await pos.coords;
        setLat(coordination.latitude);
        setLong(coordination.longitude);
    };

    const fetchLocation = () => {
        window.navigator.geolocation.getCurrentPosition(success);
    };
    
    const fetchWeatherInfo = async () => {
        if(lat && long){
            try {
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/forecast.json?key=73ed49046fd4425c884172718210709&q=${lat},${long}&days=3&aqi=no&alerts=no`
                );
                setWeatherInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        fetchLocation();
        fetchWeatherInfo();
    }, [long]);

    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.focus();
    };

    const onInputChange = (e) => {
        setCity(e.target.value);
    };

    const onFormSubmit = () => {
        try {
            axios
                .get(
                    `https://api.weatherapi.com/v1/forecast.json?key=73ed49046fd4425c884172718210709&q=${city}&days=3&aqi=no&alerts=no`
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
            {!weatherInfo ? (
                <LoadingPage />
            ) : (
                <>
                    <div className="left-side">
                        <SearchArea
                            onFormSubmit={onFormSubmit}
                            onButtonClick={onButtonClick}
                            city={city}
                            inputEl={inputEl}
                            weatherInfo={weatherInfo}
                            onInputChange={onInputChange}
                        />
                        <ResultArea
                            info={info}
                            date={date}
                            time={time}
                            lastUpdated={lastUpdated}
                        />
                    </div>
                    <div className="right-side">
                        <LineChart
                            graph={info?.forecast?.forecastday[0]?.hour}
                        />
                        <div className="card-container">
                            <Card
                                today="Today"
                                info={info?.forecast?.forecastday[0]}
                            />
                            <Card info={info?.forecast?.forecastday[1]} />
                            <Card info={info?.forecast?.forecastday[2]} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
