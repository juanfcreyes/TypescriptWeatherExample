import { DayOfWeek, WeatherIcon, WeatherIcontype, WeatherResponse } from "../model/weatherResponse";

export const buttonClick = document.getElementById("button-location");
export const weatherInput = document.getElementById("weather-location-input")  as HTMLInputElement;
export const modalDiv = document.getElementById("modal-loader")  as HTMLDivElement;
export const errorDiv = document.getElementById("text-error") as HTMLDivElement;
const dayName = document.getElementById("date-dayname") as HTMLHeadingElement;
const day = document.getElementById("date-day") as HTMLSpanElement;
const location = document.getElementById("location-text") as HTMLSpanElement;
const weatherIconPng = document.getElementById("weather-icon") as HTMLImageElement;
const weatherTemp = document.getElementById("weather-temp") as HTMLHeadingElement;
const weatherDesc = document.getElementById("weather-desc") as HTMLHeadingElement;
const textTempMax = document.getElementById("text-temp-max") as HTMLSpanElement;
const textTempMin = document.getElementById("text-temp-min") as HTMLSpanElement;
const textHumidity = document.getElementById("text-humidity") as HTMLSpanElement;
const textWind = document.getElementById("text-wind") as HTMLSpanElement;

export const updateInteface = (weather: WeatherResponse) :void => {
    dayName.innerText = getDayOfWeek();
    day.innerText = getDate();
    location.innerText = weather.name;
    weatherTemp.innerText = `${Math.floor(weather.main.temp)} ºC`;
    weatherDesc.innerText = weather.weather[0].description;
    textTempMax.innerText = `${Math.floor(weather.main.temp_max)} ºC`;
    textTempMin.innerText = `${Math.floor(weather.main.temp_min)} ºC`;
    textHumidity.innerText = `${weather.main.humidity} %`;
    textWind.innerText = `${weather.wind.speed} m/s`;
    changeWeatherIcon(weather.weather[0].icon ?? '01d');
}

export const getCity = (): string => {
    return (weatherInput) ? weatherInput.value : '';
}

function getDayOfWeek(): string {
    let day = new Date();
    console.log(day)
    return DayOfWeek[day.getDay()];
}

function getDate(): string {
    let date = new Date();
    return date.toLocaleDateString("es-EC");
}

function changeWeatherIcon(weatherImageRef: string) {
    const weatherMap = [weatherImageRef];
    validateImage(weatherMap);
    const mappedWeather = weatherMap.map(weather => WeatherIcon[weather])[0] ?? WeatherIcon["01d"];
    if(typeof mappedWeather[0] === "string") {
        if (weatherIconPng) weatherIconPng.src = mappedWeather;
    }
}

function validateImage(values: string[]): asserts values is WeatherIcontype[] {
    if (!values.every(isValidImage)) {
        throw Error('invalid image');    
    }
}

function isValidImage(value: string): value is WeatherIcontype {
    return value in WeatherIcon;
}