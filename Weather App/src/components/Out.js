import React, { useEffect, useState } from "react";
import "../Out.css";
const Out = (props) => {
  let city = props.city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=b5d664ad57879e757a538bc0df42d867`;

  const [weather, setWeather] = useState({})

  let obj;

  async function fetchData() {

    try{
        let data = await fetch(apiUrl);
        let response = await data.json();
        obj = {
            temp : response.main.temp,
            des : response.weather[0].description,
            pres : response.main.pressure,
            humi : response.main.humidity,
            wind : response.wind.speed
        }
    
        setWeather(obj)
        
        
    }
    catch{
        console.log("Error!")
    }

  }

  useEffect(() => {
    if (!!city) {
      fetchData();
    }
  }, [city]);

  return (
    <div className="out-div">
      <div className="line"></div>
            {Object.keys(weather).length > 0 && (
        <div className="results">
          <div>Weather for {city} is as follow: </div>
            <ul>Temperature = {weather.temp-273.15}°C</ul>
            <ul>Description = {weather.des}</ul>
            <ul>Pressure = {weather.pres}</ul>
            <ul>Humidity = {weather.humi}</ul>
            <ul>Wind Speed = {weather.wind}</ul>
        
        </div>)}
    </div>
  );
};

export default Out;
