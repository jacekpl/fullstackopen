import {useEffect, useState} from "react";
import weatherService from "../services/openweather.js";

const Weather = ({city}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService.getWeather(city)
            .then(initialWeather => setWeather(initialWeather))
            .catch(error => alert(error))
    }, [])

    if (weather === null) {
        return <div>loading...</div>
    }

    return <div>
        <h1>Weather in {city}</h1>
        temperature: {weather.main.temp} Celsius<br/>
        <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon"/><br/>
        wind: {weather.wind.speed} m/s
    </div>
}

export default Weather