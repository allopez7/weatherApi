import React from 'react'

const Weather = ({props})=>{
    const {main, weather, name, sys, wind} = props
    const comma = sys ? ',' : ''
    const image = weather ? <img src={`https://openweathermap.org/img/w/${weather&&weather[0]&&weather[0].icon}.png`}/> : ''
return (
    <div>
          <div>{image}</div>
          <h3>{name}{comma} {sys&&sys.country}</h3>
          <h3>{ main ? `Temp ${Math.round((main.temp-273.15)*(9/5)+32)} F` : ''}</h3>
          <h3>{ weather ? weather[0].description : ''}</h3>
          <h3>{ main ? `Feels like ${Math.round((main.feels_like-273.15)*(9/5)+32)} F` : ''}</h3>
          <h3>{ main ? `Humidity ${main.humidity}%` : ''}</h3>
          <h3>{ wind ? `${Math.round(wind.speed/0.44704)} mph` : ''}</h3>
          </div>
)
}

export default Weather