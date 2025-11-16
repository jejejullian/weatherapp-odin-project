import { getDailyForecast, getHourlyForecast } from "./weatherApi";

export function initSearchCity(){
    const searchCityField = document.querySelector('#search')

    function handleSearchCity(){
        const inputSearchCity = searchCityField.value.trim()
        if(inputSearchCity === ''){
            alert('inputnya kosong bro')
        }else{
            getDailyForecast(inputSearchCity)
            getHourlyForecast(inputSearchCity)
            searchCityField = ''
        }

    }

    searchCityField.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
            e.preventDefault()
            handleSearchCity()
        } 
    })
}