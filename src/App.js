import React, {useState} from 'react';
const api = {
    key: "607ac1d646379b88cad93976cda275a7",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = e => {
        if(e.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                })
        }
    }

    let date = String(new window.Date())
    date = date.slice(3,15)

    return (
        <div className={(typeof weather.main != "undefined")
            ? ((weather.main.temp > 16)
                ? 'app warm'
                : 'app')
            : 'app cold'}>
            <main>
                <div className="search-box">
                    <input type="text" className="search-bar" placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                           value={query}
                           onKeyPress={search}
                    />
                </div>
                {(typeof weather.main !== "undefined") ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{date}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°с
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="error">City is not found</div>
                )}
            </main>
        </div>
    );
}

export default App;
