import { WeatherResponse } from "../model/weatherResponse";

// TODO: Create an async function with an argument called city to return the that of the endpoint
export const getWeather = async (city: string = "Quito") => {
  const API_CURRENT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac6f213887b95d0b8171b342e702e112&units=metric`;
  try {
    const response = await fetch(API_CURRENT);
    const body: WeatherResponse = await response.json(); 
    if (body.cod !== 200) {
      return Promise.reject(body);
    }
    return Promise.resolve(body);
  } catch (error) {
      return Promise.reject(error);
  }
};
