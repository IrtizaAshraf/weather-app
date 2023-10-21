
const rightnow = new Date;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const hours = rightnow.getHours();
const minutes = rightnow.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';
const hours12 = hours % 12 || 12;
const time = `${hours12}:${minutes} ${ampm}`;

const dayName = days[rightnow.getDay()];
const day = rightnow.getDate();
const monthName = months[rightnow.getMonth()];
const year = rightnow.getFullYear();
const date = `${dayName}, ${day} ${monthName} ${year}`;



const form = document.querySelector('.form');
const search = document.querySelector('.absolute');
const weatherDetail = document.querySelector('#weather-deatail');

const APIdata = [];

form.addEventListener('submit', (e) => {
      e.preventDefault();
      weatherDetail.innerHTML = '';

      axios.get(`https://api.weatherapi.com/v1/current.json?key=49625a312e254d0fa9e93711231710&q=${search.value}`)
            .then((response) => {
                  const obj = response.data;
                  console.log(obj);
                  // const weatherData = {
                  //       country:obj.location,
                  //       icon: obj.icon,
                  //       temperature: obj.temp_c,
                  //       description: obj.condition.text,
                  //       humidity: obj.humidity,
                  //       windSpeed: obj.wind_kph
                  // };
                  let value = {
                        'Name': obj.location.name,
                        'Region': obj.location.region,
                        'Country': obj.location.country,
                        'Text': obj.current.condition.text,
                        'Icon': obj.current.condition.icon,
                        'Temperature': obj.current.temp_c,
                        'FeelsLike': obj.current.feelslike_c,
                        'Humidity': obj.current.humidity,
                        'Visibility': obj.current.vis_km,
                        'Pressure': obj.current.pressure_mb,
                        'Wind': obj.current.wind_kph,
                        'WindDegree': obj.current.wind_degree,
                        'Gust': obj.current.gust_kph
                  }

                  // console.log(weatherData);

                  APIdata.unshift(value)
                  weatherDetail.innerHTML += `

      <div class="weathercontainer">
            <div  id="location-box" class="lf-padd">
                  <div    class="flex justify-evenly">
                      <p> <i class="fa-solid fa-location-dot" style="color: #ffffff;"></i> &nbsp; ${value.Name}, ${value.Region}, ${value.Country}  </p>
                      <p  id="date">${date} </p>
                  </div>
                  <hr>
            </div>

        <div class="lf-padd flex justify-evenly">
            <p id="current-weather-head"> Current Weather </p>
            <p  id="time">${time} </p>
        </div>

        <div  class="flex gap-6">
            <div  class="flex gap-5 justify-center">
                <img  id="icon" src="${value.Icon}" alt="icon"  width="120px"  height="120px">
                <p  id="temp" class"text-3xl"> ${value.Temperature}<sup id="temp-unit">°C</sup> </p>
            </div>

            <div class"text-center text-2xl">
                <p  id="text"> ${value.Text}</p>
                <p  id="feels-like"> Feels Like &nbsp; ${value.FeelsLike}°</p>
            </div>
        </div>

        <div  class="flex flex-wrap gap-6 lf-padd">
            <div>
                <p class="short-head"> Humidity </p>
                <p> ${value.Humidity}% </p>
            </div>
            <div>
                <p class="short-head"> Visibility </p>
                <p> ${value.Visibility} km </p>
            </div>
            <div>
                <p class="short-head"> Pressure </p>
                <p> ${value.Pressure} mb </p>
            </div>
            <div>
                <p class="short-head"> Wind </p>
                <p> ${value.Wind} kph </p>
            </div>
            <div>
                <p class="short-head"> Wind Degree </p>
                <p> ${value.WindDegree}° </p>
            </div>
            <div>
                <p class="short-head"> Gust </p>
                <p> ${value.Gust} kph </p>
            </div>
        </div>

      </div>
            `;
            search.value=''
            })
            .catch((error) => {
                  // Handle errors, for example, display an error message
                  console.error(error);
                //   weatherDetail.style.color = "red";
                  weatherDetail.innerHTML = `<p class="data">Data Not Found.</p>`;
            });
});
