import React, { useState } from 'react';
import axios from 'axios';

type Main = { main: string };

interface IWeatherData {
  name: string;
  main:
    | undefined
    | {
        temp: string;
        feels_like: string;
        humidity: string;
      };
  weather: undefined | Main[];
  wind:
    | undefined
    | {
        speed: string;
      };
}

const initialState = {
  name: '',
  main: undefined,
  weather: undefined,
  wind: undefined,
};

function App() {
  const [data, setData] = useState<IWeatherData>(initialState);
  const [location, setLocation] = useState('');

  const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=cb5693a130d910169c8cacd3257a5f65`;

  const searchLocation = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      axios.get(url).then(response => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            placeholder="Enter location"
            type="text"
          />
        </div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Number(data.main.temp).toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.main !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like}</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
