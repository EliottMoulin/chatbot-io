"useStricts";

const commands = ['/help', '/clear', '/hello', '/weather', '/movie', '/gif'];

let messageContainer = document.getElementById('message-container');
let botsContainer = document.getElementById('bots-container');
let submitButton = document.getElementById('submit-button');
let inputField = document.getElementById('input-field');

const scrollToBottom = () => {
    messageContainer.scrollTop = messageContainer.scrollHeight;
};

const createMessageHtml = (isMine, avatar, name, message) => {
    let datetime = new Date().toLocaleTimeString();
    let messageContent = message;

    if ((message.startsWith('http://') || message.startsWith('https://')) && (message.endsWith('.jpg') || message.endsWith('.png') || message.endsWith('.gif') || message.endsWith('&ct=g'))) {
        messageContent = `<img src="${message}" alt="image" class="max-w-full" onload="scrollToBottom()">`;
    }

    if (isMine) {
        return `
        <div class="flex items-start mb-4 justify-end">
            <img src="${avatar}" alt="avatar" class="w-8 h-8 rounded-full mr-2 object-cover border whitespace-nowrap">
            <div class="bg-blue-500 rounded-lg px-3 py-2 text-white self-end whitespace-normal">
                <p class="text-sm">${message}</p>
                <span class="text-xs text-gray-400">${datetime}</span>
            </div>
        </div>`
    } else {
        return `
        <div class="flex items-start mb-4">
            <img src="${avatar}" alt="avatar" class="w-10 h-10 rounded-full mr-3 object-cover border whitespace-nowrap">
            <div class="flex flex-col">
                <span class="font-semibold">${name}</span>
                <div class="bg-gray-100 rounded-lg px-3 py-2 mt-2 whitespace-normal">
                    <div class="text-gray-600 text-sm">${messageContent}</div>
                    <span class="text-gray-400 text-xs">${datetime}</span>
                </div>
            </div>
        </div>`;
    }
};

const executeCommand = async (command) => {

    let parameters = command.slice(1);

    switch (command[0]) {
        case '/help':
            messageContainer.innerHTML += `
            <div class="flex items-center mb-4 ml-12 flex-wrap">
                <span class="text-gray-400 mr-2">Commandes :</span>
                ${commands.map(c => `<span class="bg-gray-100 rounded-lg px-3 py-1 text-gray-600 text-sm mr-2 mb-2 inline-block">${c}</span>`).join('')}
            </div> `;
            break;

        case '/clear':
            messageContainer.innerHTML = '';
            break;

        case '/hello':
            bots.forEach(bot => messageContainer.innerHTML += createMessageHtml(false, bot.avatar, bot.name, bot.response));
            break;

        case '/weather':
            if (parameters.length == 0 || !bots[1].parameters.includes(parameters[0])) {
                messageContainer.innerHTML += createMessageHtml(false, bots[1].avatar, bots[1].name, 'Veuillez entrer un paramètre valide parmi : temp, cloud, wind');
                break;
            }
            if (parameters[1] == undefined || parameters[1].length == 0) {
                messageContainer.innerHTML += createMessageHtml(false, bots[1].avatar, bots[1].name, `Veuillez entrer une ville, exemple : /weather ${parameters[0]} Paris`);
                break;
            }

            let city = parameters.slice(1).join(" ");
            let weather = await getWeatherFromCityName(city);

            if (parameters[0] === 'temp') {
                messageContainer.innerHTML += createMessageHtml(false, bots[1].avatar, bots[1].name, `Il fait ${weather.main.temp}°C à ${city}`);
            }

            if (parameters[0] === 'cloud') {
                messageContainer.innerHTML += createMessageHtml(false, bots[1].avatar, bots[1].name, `Il y a ${weather.clouds.all}% de nuages à ${city}`);
            }

            if (parameters[0] === 'wind') {
                messageContainer.innerHTML += createMessageHtml(false, bots[1].avatar, bots[1].name, `Il y a ${(weather.wind.speed / 1000) * 3600} km/h de vent à ${city}`);
            }
            break;

        case '/movie':
            if (parameters.length == 0 || !bots[2].parameters.includes(parameters[0])) {
                messageContainer.innerHTML += createMessageHtml(false, bots[2].avatar, bots[2].name, 'Veuillez entrer un paramètre valide parmi : trend, bad, best');
                break;
            }

            if (parameters[0] === 'trend') {
                let movies = await getTrendWeekMovies();

                let message = 'Voici les 10 films les plus populaires cette semaine :<br><br>';
                for (let i = 0; i < 10; i++) {
                    message += `${movies.results[i].title} (${movies.results[i].release_date})<br>`;
                }
                messageContainer.innerHTML += createMessageHtml(false, bots[2].avatar, bots[2].name, message);
            }

            if (parameters[0] === 'bad') {
                if (parameters[1] == undefined || parameters[1].length == 0 || parameters[1].length != 4 || parameters[1] < 1900 || parameters[1] > new Date().getFullYear()) {
                    messageContainer.innerHTML += createMessageHtml(false, bots[2].avatar, bots[2].name, `Veuillez entrer une année, exemple : /movie bad 2010`);
                    break;
                }
                let year = parameters[1];
                let movies = await getBadMoviesFromYear(year);
                let message = `Voici les 10 films les plus mal notés de l'année ${year} :<br><br>`;
                for (let i = 0; i < 10; i++) {
                    message += `${movies.results[i].title} (${movies.results[i].vote_average}/10)<br>`;
                }
                messageContainer.innerHTML += createMessageHtml(false, bots[2].avatar, bots[2].name, message);
            }

            if (parameters[0] === 'best') {
                if (parameters[1] == undefined || parameters[1].length == 0 || parameters[1].length != 4 || parameters[1] < 1900 || parameters[1] > new Date().getFullYear()) {
                    messageContainer.innerHTML += createMessageHtml(false, bots[2].avatar, bots[2].name, `Veuillez entrer une année, exemple : /movie best 2010`);
                    break;
                }
                let year = parameters[1];
                let movies = await getBestMoviesFromYear(year);
                let message = `Voici les 10 films les mieux notés de l'année ${year} :<br><br>`;
                for (let i = 0; i < 10; i++) {
                    message += `${movies.results[i].title} (${movies.results[i].vote_average}/10)<br>`;
                }
                messageContainer.innerHTML += createMessageHtml(false, bots[2].avatar, bots[2].name, message);
            }
            break;

        case '/gif':
            if (parameters.length == 0 || !bots[3].parameters.includes(parameters[0])) {
                messageContainer.innerHTML += createMessageHtml(false, bots[3].avatar, bots[3].name, 'Veuillez entrer un paramètre valide parmi : random, trend, search');
                break;
            }

            if (parameters[0] === 'random') {
                let gif = await getRandomGif();
                messageContainer.innerHTML += createMessageHtml(false, bots[3].avatar, bots[3].name, gif.data.images.original.url);
            }

            if (parameters[0] === 'trend') {
                if (Number.parseInt(parameters[1]) > 10) {
                    messageContainer.innerHTML += createMessageHtml(false, bots[3].avatar, bots[3].name, `Veuillez entrer un nombre inférieur ou égal à 10`);
                    break;
                }
                let gifs = await getTrendGifs(parameters[1]);
                let message = `Voici les ${parameters[1] ?? 10} gifs les plus populaires :<br><br>`;
                for (let i = 0; i < gifs.data.length; i++) {
                    message += `${gifs.data[i].title}<br><img src="${gifs.data[i].images.original.url}" alt="gif" class="w-64 h-64 object-cover" onload="scrollToBottom()"><br><br>`;
                }
                messageContainer.innerHTML += createMessageHtml(false, bots[3].avatar, bots[3].name, message);
            }

            if (parameters[0] === 'search') {
                if (parameters[1] == undefined || parameters[1].length == 0) {
                    messageContainer.innerHTML += createMessageHtml(false, bots[3].avatar, bots[3].name, `Veuillez entrer un mot clé, exemple : /gif search chat`);
                    break;
                }
                let gifs = await getGifFromSearch(parameters[1]);
                console.log(gifs);
                let message = `Voici les gifs les plus populaires pour le mot clé ${parameters[1]} :<br><br>`;
                for (let i = 0; i < gifs.data.length; i++) {
                    message += `${gifs.data[i].title}<br><img src="${gifs.data[i].images.original.url}" alt="gif" class="w-64 h-64 object-cover" onload="scrollToBottom()"><br><br>`;
                }
                messageContainer.innerHTML += createMessageHtml(false, bots[3].avatar, bots[3].name, message);
            }
            break;

    }
}


submitButton.addEventListener('click', () => {
    let message = inputField.value;

    if (message == '') return;

    messageContainer.innerHTML += createMessageHtml(true, 'https://i.pravatar.cc/300', 'You', message);

    if (message.startsWith('/')) {
        if (commands.includes(message.split(' ')[0])) {
            executeCommand(message.split(' '));
        } else {
            messageContainer.innerHTML += createMessageHtml(false, bots[0].avatar, bots[0].name, `Commande inconnue : ${message.split(' ')[0]}`);
        }
    }
    inputField.value = '';
    inputField.focus();
    scrollToBottom();
});


bots.forEach(bot => {
    botsContainer.innerHTML += `
        <li class="px-5 py-2 flex items-center">
        <img src="${bot.avatar}" alt="avatar" class="w-10 h-10 rounded-full object-cover mr-3">
        <div class="flex flex-col">
          <span class="text-gray-300 font-semibold">${bot.name}</span>
          <span class="text-gray-400 text-sm">${bot.description}</span>
        </div>
        <div class="ml-auto h-4 w-4 bg-green-500 rounded-full"></div>
      </li>`;
});