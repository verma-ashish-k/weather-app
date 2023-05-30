import { fetchWeatherData } from '../api/weatherApi';

export const cities = [
  { name: 'Calgary', lat: 51.08, lon: -114.08 },
  { name: 'Vancouver', lat: 49.25, lon: -123.13 },
  { name: 'Toronto', lat: 43.67, lon: -79.42 },
];

const CitySelection: React.FC = () => {
  const handleCitySelection = async (city: string) => {
    const weatherData = await fetchWeatherData(city);
  };

  return (
    <div>
      <h2>Select a city:</h2>
      {cities.map((city) => (
        <button key={city.name} onClick={() => handleCitySelection(city.name)}>
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default CitySelection;
