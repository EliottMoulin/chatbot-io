"useStricts";

// --- Mohamed Mossad API --- //

async function getLatAndLonFromCityName(cityName) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${WEATHER_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getWeatherFromLatAndLon(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
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

async function getTrendWeekMovies() {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${MOVIES_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getBadMoviesFromYear(year) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIES_API_KEY}&language=fr-FR&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&primary_release_year=${year}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getBestMoviesFromYear(year) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIES_API_KEY}&language=fr-FR&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


// --- Gaston laGiffe API --- //

async function getRandomGif() {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getTrendGifs(number = 10) {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=${number}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getGifFromSearch(search) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${search}&rating=g&lang=fr&limit=10`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


// --- ChatGPT --- //

async function getGptResponse(prompt) {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${CHATGPT_API_KEY}`
    };
    const data = {
      "model": "gpt-3.5-turbo",
      "messages": [{ "role": "user", "content": prompt }]
    };
  
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
        return "ERROR : " + response.status + ' -> ' + response.statusText;
    }
  
    const result = await response.json();
    const responseText = result.choices[0].messages.content.trim();
  
    return responseText;
  }