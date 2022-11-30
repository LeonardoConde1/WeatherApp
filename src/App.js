import React,{useState} from 'react';
import axios from 'axios';




function App() {

 
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f33b2910e8302f1da4779b86a6219e03&units=metric&lang=sp,es`

  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth();
  var year = today.getFullYear();
  var date =day + '/' + month + '/' + year;


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  return (
    
    <div className='app'>
      <div className='search'>
        <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='City'
         type="text"/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p> 
            {data.name != undefined &&
            <p>{date}</p>
         
              }
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
         </div>
          <div className='Description'>
              {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className='icons '>
          <img
              src={ data.weather ?`icons/${data.weather[0].icon}.png`: null } 
              alt=""
           />   
           </div> 
          </div>
    
    {data.name != undefined &&
  <div className='bottom'>
  <div className='feels'>
     {data.main ? <p className='bold'>{data.main.feels_like.toFixed()} °C </p> :null}
     <p>Feels Like</p>
     </div>
     <div className='humidity'>
       {data.main ? <p className='bold'>{data.main.humidity} %</p> :null}
       <p>Humidity</p>
     </div>
     <div className='wind'>
        {data.main ? <p className='bold'>{data.wind.speed.toFixed()} Meter/sec </p> :null}
        <p>Wind Speed</p>
     </div>
   </div>
    }
    
    </div>
      </div>
   
  );
}
export default App;
