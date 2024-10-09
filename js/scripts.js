//variaveis e seleção de elementos
const apiKey = "40f7cb807260dd5d45bbd156f4be8f4d";
const apiCountryURL = "https://flagcdn.com/16x12/br.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const messageh3 = document.querySelector("#h3")
//funções

//funcao que acessa a API
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  return data;
};

const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
}

const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if(data.cod === "404") {
    showErrorMessage();
    return
  }

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp); //as vezes a temp vem com info quebrada
  descElement.innerText = data.weather[0].description; //vai ser a descricao (?)
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute(
    "src",
    `https://flagcdn.com/16x12/${data.sys.country.toLowerCase()}.png`
  );
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  weatherContainer.classList.remove("hide"); //para remover a classe "hide" quando apertar na lupa, qnd ocorrer a pesquisa da cidade
};

//eventos
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);

  h3.textContent = 'Confira o clima desta cidade:';
  
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value
    showWeatherData(city)
  }
});
