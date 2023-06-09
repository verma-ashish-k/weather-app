'use client';

import { useEffect, useState } from 'react';
import Card from './components/CityCard';
import { fetchWeatherData } from './api/weatherApi';
import { WeatherResponse } from './api/weatherResponse';
import weatherConditions from './data/weatherConditions.json';

const weatherConditionIcons: Record<string, Record<number, string>> = {
  day: {},
  night: {},
};

for (let condition of weatherConditions) {
  weatherConditionIcons.day[
    condition.code
  ] = `/weatherIcons/day/${condition.icon}.png`;
  weatherConditionIcons.night[
    condition.code
  ] = `/weatherIcons/night/${condition.icon}.png`;
}

function getDayOfWeek(dateString: string) {
  const date = new Date(dateString);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>('Calgary');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

  const handleCitySelection = (city: string) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCity) {
          const data = await fetchWeatherData(selectedCity);
          console.log('weatherData:', data);
          setWeatherData(data);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [selectedCity]);

  const forecastData =
    weatherData?.forecast?.forecastday?.slice(2).map((day) => ({
      ...day,
      date: getDayOfWeek(day.date),
    })) ?? [];

  console.log('forecastData:', forecastData);

  return (
    <>
      <main className='items-center min-w-full justify-center w-full px-5 text-center mt-20'>
        <div className='flex flex-row justify-center gap-3 lg:gap-16'>
          <h1
            className={`text-xl lg:text-2xl tracking-wider  cursor-pointer ${
              selectedCity === 'Calgary'
                ? 'font-extrabold text-sky-600'
                : 'font-extralight'
            }`}
            style={{
              fontFamily: 'var(--font-kumbh-sans), sans-serif',
            }}
            onClick={() => handleCitySelection('Calgary')}
          >
            CALGARY
          </h1>
          <h1
            className={`text-xl lg:text-2xl tracking-wider  cursor-pointer ${
              selectedCity === 'Vancouver'
                ? ' font-extrabold text-sky-600'
                : 'font-extralight'
            }`}
            style={{
              fontFamily: 'var(--font-kumbh-sans), sans-serif',
            }}
            onClick={() => handleCitySelection('Vancouver')}
          >
            VANCOUVER
          </h1>
          <h1
            className={`text-xl lg:text-2xl tracking-wider  cursor-pointer ${
              selectedCity === 'Toronto'
                ? 'font-extrabold text-sky-600'
                : 'font-extralight'
            }`}
            style={{
              fontFamily: 'var(--font-kumbh-sans), sans-serif',
            }}
            onClick={() => handleCitySelection('Toronto')}
          >
            TORONTO
          </h1>
        </div>

        <div className='container mt-10 mx-auto md:max-w-screen-sm lg:max-w-screen-sm'>
          {weatherData ? (
            <Card
              mainHeading='Today'
              mainIcon={
                weatherConditionIcons[
                  weatherData.current?.is_day ? 'day' : 'night'
                ][weatherData.current?.condition.code] ?? ''
              }
              mainText={weatherData.current?.condition.text ?? ''}
              temperature={weatherData.current?.temp_c?.toString() ?? ''}
              sections={forecastData.map((day) => ({
                heading: day.date ?? '',
                icon: weatherConditionIcons.day[day.day?.condition.code],
                text: day.day?.maxtemp_c?.toString() ?? '',
              }))}
              selectedCity={selectedCity}
            />
          ) : (
            <div className='spinner'></div>
          )}
        </div>
      </main>
    </>
  );
}
