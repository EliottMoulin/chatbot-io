"useStricts";

const commands = ['/help', '/clear', '/hello', '/weather', '/movie', '/gif', '/gpt'];

let messageContainer = document.getElementById('message-container');
let botsContainer = document.getElementById('bots-container');
let submitButton = document.getElementById('submit-button');
let inputField = document.getElementById('input-field');

const scrollToBottom = () => {
    messageContainer.scrollTop = messageContainer.scrollHeight;
};

const createMessageHtml = (isMine, avatar, name, message) => {
    let html;
    let datetime = new Date().toLocaleTimeString();
    let messageContent = message;

    if ((message.startsWith('http://') || message.startsWith('https://')) && (message.endsWith('.jpg') || message.endsWith('.png') || message.endsWith('.gif') || message.endsWith('&ct=g'))) {
        messageContent = `<img src="${message}" alt="image" class="max-w-full" onload="scrollToBottom()">`;
    }

    if (isMine) {
        html = `
        <div class="flex items-start mb-4 justify-end">
            <img src="${avatar}" alt="avatar" class="w-8 h-8 rounded-full mr-2 object-cover border whitespace-nowrap">
            <div class="bg-blue-500 rounded-lg px-3 py-2 text-white self-end whitespace-normal">
                <p class="text-sm">${message}</p>
                <span class="text-xs text-gray-400">${datetime}</span>
            </div>
        </div>`
    } else {
        html = `
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

    messageContainer.innerHTML += html;
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
            bots.forEach(bot => createMessageHtml(false, bot.avatar, bot.name, bot.response));
            break;

        case '/weather':
            if (parameters.length == 0 || !bots[1].parameters.includes(parameters[0])) {
                createMessageHtml(false, bots[1].avatar, bots[1].name, 'Veuillez entrer un paramètre valide parmi : temp, cloud, wind');
                break;
            }
            if (parameters[1] == undefined || parameters[1].length == 0) {
                createMessageHtml(false, bots[1].avatar, bots[1].name, `Veuillez entrer une ville, exemple : /weather ${parameters[0]} Paris`);
                break;
            }

            let city = parameters.slice(1).join(" ");
            let weather = await getWeatherFromCityName(city);

            if (parameters[0] === 'temp') {
                createMessageHtml(false, bots[1].avatar, bots[1].name, `Il fait ${weather.main.temp}°C à ${city}`);
            }

            if (parameters[0] === 'cloud') {
                createMessageHtml(false, bots[1].avatar, bots[1].name, `Il y a ${weather.clouds.all}% de nuages à ${city}`);
            }

            if (parameters[0] === 'wind') {
                createMessageHtml(false, bots[1].avatar, bots[1].name, `Il y a ${(weather.wind.speed / 1000) * 3600} km/h de vent à ${city}`);
            }
            break;

        case '/movie':
            if (parameters.length == 0 || !bots[2].parameters.includes(parameters[0])) {
                createMessageHtml(false, bots[2].avatar, bots[2].name, 'Veuillez entrer un paramètre valide parmi : trend, bad, best');
                break;
            }

            if (parameters[0] === 'trend') {
                let movies = await getTrendWeekMovies();

                let message = 'Voici les 10 films les plus populaires cette semaine :<br><br>';
                for (let i = 0; i < 10; i++) {
                    message += `${movies.results[i].title} (${movies.results[i].release_date})<br>`;
                }
                createMessageHtml(false, bots[2].avatar, bots[2].name, message);
            }

            if (parameters[0] === 'bad') {
                if (parameters[1] == undefined || parameters[1].length == 0 || parameters[1].length != 4 || parameters[1] < 1900 || parameters[1] > new Date().getFullYear()) {
                    createMessageHtml(false, bots[2].avatar, bots[2].name, `Veuillez entrer une année, exemple : /movie bad 2010`);
                    break;
                }
                let year = parameters[1];
                let movies = await getBadMoviesFromYear(year);
                let message = `Voici les 10 films les plus mal notés de l'année ${year} :<br><br>`;
                for (let i = 0; i < 10; i++) {
                    message += `${movies.results[i].title} (${movies.results[i].vote_average}/10)<br>`;
                }
                createMessageHtml(false, bots[2].avatar, bots[2].name, message);
            }

            if (parameters[0] === 'best') {
                if (parameters[1] == undefined || parameters[1].length == 0 || parameters[1].length != 4 || parameters[1] < 1900 || parameters[1] > new Date().getFullYear()) {
                    createMessageHtml(false, bots[2].avatar, bots[2].name, `Veuillez entrer une année, exemple : /movie best 2010`);
                    break;
                }
                let year = parameters[1];
                let movies = await getBestMoviesFromYear(year);
                let message = `Voici les 10 films les mieux notés de l'année ${year} :<br><br>`;
                for (let i = 0; i < 10; i++) {
                    message += `${movies.results[i].title} (${movies.results[i].vote_average}/10)<br>`;
                }
                createMessageHtml(false, bots[2].avatar, bots[2].name, message);
            }
            break;

        case '/gif':
            if (parameters.length == 0 || !bots[3].parameters.includes(parameters[0])) {
                createMessageHtml(false, bots[3].avatar, bots[3].name, 'Veuillez entrer un paramètre valide parmi : random, trend, search');
                break;
            }

            if (parameters[0] === 'random') {
                let gif = await getRandomGif();
                createMessageHtml(false, bots[3].avatar, bots[3].name, gif.data.images.original.url);
            }

            if (parameters[0] === 'trend') {
                if (Number.parseInt(parameters[1]) > 10) {
                    createMessageHtml(false, bots[3].avatar, bots[3].name, `Veuillez entrer un nombre inférieur ou égal à 10`);
                    break;
                }
                let gifs = await getTrendGifs(parameters[1]);
                let message = `Voici les ${parameters[1] ?? 10} gifs les plus populaires :<br><br>`;
                for (let i = 0; i < gifs.data.length; i++) {
                    message += `${gifs.data[i].title}<br><img src="${gifs.data[i].images.original.url}" alt="gif" class="w-64 h-64 object-cover" onload="scrollToBottom()"><br><br>`;
                }
                createMessageHtml(false, bots[3].avatar, bots[3].name, message);
            }

            if (parameters[0] === 'search') {
                if (parameters[1] == undefined || parameters[1].length == 0) {
                    createMessageHtml(false, bots[3].avatar, bots[3].name, `Veuillez entrer un mot clé, exemple : /gif search chat`);
                    break;
                }
                let query = parameters.slice(1).join(" ");
                let gifs = await getGifFromSearch(query);
                let message = `Voici les gifs les plus populaires pour le mot clé ${query} :<br><br>`;
                for (let i = 0; i < gifs.data.length; i++) {
                    message += `${gifs.data[i].title}<br><img src="${gifs.data[i].images.original.url}" alt="gif" class="w-64 h-64 object-cover" onload="scrollToBottom()"><br><br>`;
                }
                createMessageHtml(false, bots[3].avatar, bots[3].name, message);
            }
            break;

        case '/gpt':
            let bot = bots.find( bot => bot.nickname == parameters[0]);
            if (parameters.length == 0 || bot == undefined) {
                createMessageHtml(false, bots[1].avatar, bots[1].name, 'Veuillez entrer un nom de bot parmi : admin, momo, christ, gaston');
                break;
            }

            if (parameters[1] == undefined || parameters[1].length == 0) {
                createMessageHtml(false, bots[1].avatar, bots[1].name, `Veuillez entrer un prompt, exemple : /gpt gaston Comment vas-tu ?`);
                break;
            }

            let prompt = parameters.slice(1).join(" ");

            console.log(`GPT-3 request : ${bot.name} - ${prompt}`);
            
            let response = await getGptResponse(parameters[0], prompt);
            console.log(response);
            createMessageHtml(false, bot.avatar, bot.name, response);

    }
}


submitButton.addEventListener('click', () => {
    let message = inputField.value;

    if (message == '') return;

    createMessageHtml(true, 'https://i.pravatar.cc/300', 'You', message);

    if (message.startsWith('/')) {
        if (commands.includes(message.split(' ')[0])) {
            executeCommand(message.split(' '));
        } else {
            createMessageHtml(false, bots[0].avatar, bots[0].name, `Commande inconnue : ${message.split(' ')[0]}`);
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