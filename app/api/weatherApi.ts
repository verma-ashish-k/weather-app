import { WeatherResponse } from './weatherResponse';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const API_ENDPOINT = 'http://api.weatherapi.com/v1/forecast.json';

export const fetchWeatherData = async (city: string): Promise<WeatherResponse | null> => {
  try {
    const response = await fetch(`${API_ENDPOINT}?key=${API_KEY}&q=${city}&days=6`);
    const data = await response.json();
    return data as WeatherResponse;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
