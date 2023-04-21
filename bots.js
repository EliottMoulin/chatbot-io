"useStricts";

const bots = [
    {
        name: 'PapAdmin',
        description: 'Bot - Admin',
        avatar: 'https://www.gala.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2F2c7551dc-999d-42d1-8020-81bcab3a2d92.2Ejpeg/2048x1536/quality/80/pape-francois.jpeg',
        response : 'Bienvenue sur le chat !',
        parameters: []
    },
    {
        name: 'Mohamed Mossad',
        description: 'Bot - Météo',
        avatar: 'https://pbs.twimg.com/media/EEdYYn7WwAEcPaI.jpg',
        response : 'Salam aleykoum, il fait bien beau aujourd\'hui',
        parameters : ['temp', 'cloud', 'wind']
    },      
    {
        name: 'Christopher Nol Âne',
        description: 'Bot - Films',
        avatar: 'https://pbs.twimg.com/profile_images/583674329990361088/UlQJ24vU_400x400.jpg',
        response : 'Tenet ou t\'es pas net ?',
        parameters: []
    },  
    {
        name: 'Gaston laGiffe',
        description: 'Bot - Gifs',
        avatar: 'https://www.ln24.be/sites/default/files/styles/full_no_crop/public/2022-03/Le-retour-de-Lagaffe-2.jpg?itok=-WGc16b0',
        response : 'https://media1.giphy.com/media/13GgTtFZZDIcjttYXg/giphy.gif',
        parameters: []
    },   
];

// --- Mohamed Mossad API --- //

async function getLatAndLonFromCityName(cityName) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=4b69fa9dabd4dc5e1f5a89b9b26eb0a7`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getWeatherFromLatAndLon(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4b69fa9dabd4dc5e1f5a89b9b26eb0a7&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getWeatherFromCityName(cityName) {
    const latAndLon = await getLatAndLonFromCityName(cityName);
    const lat = latAndLon[0].lat;
    const lon = latAndLon[0].lon;
    return await getWeatherFromLatAndLon(lat, lon);
}

// --- Christopher Nol Âne API --- //
// todo

// --- Gaston laGiffe API --- //
// todo