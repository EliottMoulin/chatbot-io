class Command {
    constructor(command, args) {
        this.command = command;
        this.args = args;
    }

    async execute () {
        switch (this.command) {
            case '/help':
                this.help();
                return;
            case '/clear':
                this.clear();
                return;
            case '/hello':
                this.hello();
                return;
            case '/weather':
                this.weather();
                return;
            case '/movie':
                this.movie();
                return;
            case '/gif':
                this.gif();
                return;
            case '/gpt':
                this.gpt();
                return;
            default:
                new Message(false, ADMIN_BOT.avatar, ADMIN_BOT.name, `La commande ${this.command} n'existe pas, tapez /help pour voir les commandes disponibles`).sendMessage();
                return;
        }
    }


    help() {
        let possibleCommandsHtml = commands.map(command => `<strong>${command.split(" -> ")[0]}</strong> -> ${command.split(" -> ")[1]}`).join("<br>");
        let message = `Voici les commandes possibles :<br><br>${possibleCommandsHtml}`;
        new Message(false, ADMIN_BOT.avatar, ADMIN_BOT.name, message).sendMessage();
    }

    clear() {
        messageContainer.innerHTML = '';
        localStorage.setItem('messages', JSON.stringify([]));
    }

    hello() {
        bots.forEach(bot => new Message(false, bot.avatar, bot.name, bot.response).sendMessage());
    }

    async weather() {
        if (this.args.length == 0 || !WEATHER_BOT.parameters.includes(this.args[0])) {
            new Message(false, WEATHER_BOT.avatar, WEATHER_BOT.name, 'Veuillez entrer un paramètre valide parmi : temp, cloud, wind').sendMessage();
            return;
        }
        if (this.args[1] == undefined || this.args[1].length == 0) {
            new Message(false, WEATHER_BOT.avatar, WEATHER_BOT.name, `Veuillez entrer une ville, exemple : /weather ${this.args[0]} Paris`).sendMessage();
            return;
        }

        let city = this.args.slice(1).join(" ");
        let weather = await getWeatherFromCityName(city);

        if (this.args[0] === 'temp') {
            new Message(false, WEATHER_BOT.avatar, WEATHER_BOT.name, `Il fait ${weather.main.temp}°C à ${city}`).sendMessage();
        }

        if (this.args[0] === 'cloud') {
            new Message(false, WEATHER_BOT.avatar, WEATHER_BOT.name, `Il y a ${weather.clouds.all}% de nuages à ${city}`).sendMessage();
        }

        if (this.args[0] === 'wind') {
            new Message(false, WEATHER_BOT.avatar, WEATHER_BOT.name, `Il y a ${(weather.wind.speed / 1000) * 3600} km/h de vent à ${city}`).sendMessage();
        }
    }

    async movie() {
        if (this.args.length == 0 || !MOVIE_BOT.parameters.includes(this.args[0])) {
            new Message(false, MOVIE_BOT.avatar, MOVIE_BOT.name, 'Veuillez entrer un paramètre valide parmi : trend, bad, best').sendMessage();
            return;
        }

        if (this.args[0] === 'trend') {
            let movies = await getTrendWeekMovies();

            let message = 'Voici les 10 films les plus populaires cette semaine :<br><br>';
            for (let i = 0; i < 10; i++) {
                message += `${movies.results[i].title} (${movies.results[i].release_date})<br>`;
            }
            new Message(false, MOVIE_BOT.avatar, MOVIE_BOT.name, message).sendMessage();
        }

        if (this.args[0] === 'bad') {
            if (this.args[1] == undefined || this.args[1].length == 0 || this.args[1].length != 4 || this.args[1] < 1900 || this.args[1] > new Date().getFullYear()) {
                new Message(false, MOVIE_BOT.avatar, MOVIE_BOT.name, `Veuillez entrer une année, exemple : /movie bad 2010`).sendMessage();
                return;
            }
            let year = this.args[1];
            let movies = await getBadMoviesFromYear(year);
            let message = `Voici les 10 films les plus mal notés de l'année ${year} :<br><br>`;
            for (let i = 0; i < 10; i++) {
                message += `${movies.results[i].title} (${movies.results[i].vote_average}/10)<br>`;
            }
            new Message(false, MOVIE_BOT.avatar, MOVIE_BOT.name, message).sendMessage();
        }

        if (this.args[0] === 'best') {
            if (this.args[1] == undefined || this.args[1].length == 0 || this.args[1].length != 4 || this.args[1] < 1900 || this.args[1] > new Date().getFullYear()) {
                new Message(false, MOVIE_BOT.avatar, MOVIE_BOT.name, `Veuillez entrer une année, exemple : /movie best 2010`).sendMessage();
                return;
            }
            let year = this.args[1];
            let movies = await getBestMoviesFromYear(year);
            let message = `Voici les 10 films les mieux notés de l'année ${year} :<br><br>`;
            for (let i = 0; i < 10; i++) {
                message += `${movies.results[i].title} (${movies.results[i].vote_average}/10)<br>`;
            }
            new Message(false, MOVIE_BOT.avatar, MOVIE_BOT.name, message).sendMessage();
        }
    }

    async gif() {
        if (this.args.length == 0 || !GIF_BOT.parameters.includes(this.args[0])) {
            new Message(false, GIF_BOT.avatar, GIF_BOT.name, 'Veuillez entrer un paramètre valide parmi : random, trend, search').sendMessage();
            return;
        }

        if (this.args[0] === 'random') {
            let gif = await getRandomGif();
            new Message(false, GIF_BOT.avatar, GIF_BOT.name, gif.data.images.original.url).sendMessage();
        }

        if (this.args[0] === 'trend') {
            if (Number.parseInt(this.args[1]) > 10) {
                new Message(false, GIF_BOT.avatar, GIF_BOT.name, `Veuillez entrer un nombre inférieur ou égal à 10`).sendMessage();
                return;
            }
            let gifs = await getTrendGifs(this.args[1]);
            let message = `Voici les ${this.args[1] ?? 10} gifs les plus populaires :<br><br>`;
            for (let i = 0; i < gifs.data.length; i++) {
                message += `${gifs.data[i].title}<br><img src="${gifs.data[i].images.original.url}" alt="gif" class="w-64 h-64 object-cover" onload="scrollToBottom()"><br><br>`;
            }
            new Message(false, GIF_BOT.avatar, GIF_BOT.name, message).sendMessage();
        }

        if (this.args[0] === 'search') {
            if (this.args[1] == undefined || this.args[1].length == 0) {
                new Message(false, GIF_BOT.avatar, GIF_BOT.name, `Veuillez entrer un mot clé, exemple : /gif search chat`).sendMessage();
                return;
            }
            let query = this.args.slice(1).join(" ");
            let gifs = await getGifFromSearch(query);
            let message = `Voici les gifs les plus populaires pour le mot clé ${query} :<br><br>`;
            for (let i = 0; i < gifs.data.length; i++) {
                message += `${gifs.data[i].title}<br><img src="${gifs.data[i].images.original.url}" alt="gif" class="w-64 h-64 object-cover" onload="scrollToBottom()"><br><br>`;
            }
            new Message(false, GIF_BOT.avatar, GIF_BOT.name, message).sendMessage();
        }
    }

    async gpt () {
        let bot = bots.find( bot => bot.nickname == this.args[0]);
        if (this.args.length == 0 || bot == undefined) {
            new Message(false, WEATHER_BOT.avatar, WEATHER_BOT.name, 'Veuillez entrer un nom de bot parmi : admin, momo, christ, gaston').sendMessage();
            return;
        }

        if (this.args[1] == undefined || this.args[1].length == 0) {
            new Message(false, WEATHER_BOT.avatar, WEATHER_BOT.name, `Veuillez entrer un prompt, exemple : /gpt gaston Comment vas-tu ?`).sendMessage();
            return;
        }

        let prompt = this.args.slice(1).join(" ");
        
        let response = await getGptResponse(this.args[0], prompt);
        new Message(false, bot.avatar, bot.name, response).sendMessage();
    }

}