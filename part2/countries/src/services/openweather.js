import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5";

const getWeather = (city) => {
    const request = axios.get(baseUrl + '/weather?q=' + city + '&appid=' + apiKey + '&units=metric');
    return request.then(response => response.data);
}

export default {getWeather};