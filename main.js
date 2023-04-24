"useStricts";

let messageContainer = document.getElementById('message-container');
let botsContainer = document.getElementById('bots-container');
let submitButton = document.getElementById('submit-button');
let inputField = document.getElementById('input-field');

// Initialize bot
const ADMIN_BOT = new Bot(bots[0].nickname, bots[0].name, bots[0].avatar, bots[0].description, bots[0].parameters);
const WEATHER_BOT = new Bot(bots[1].nickname, bots[1].name, bots[1].avatar, bots[1].description, bots[1].parameters);
const MOVIE_BOT = new Bot(bots[2].nickname, bots[2].name, bots[2].avatar, bots[2].description, bots[2].parameters);
const GIF_BOT = new Bot(bots[3].nickname, bots[3].name, bots[3].avatar, bots[3].description, bots[3].parameters);

WEATHER_BOT.create();
ADMIN_BOT.create();
MOVIE_BOT.create();
GIF_BOT.create();


const scrollToBottom = () => {
    messageContainer.scrollTop = messageContainer.scrollHeight;
};


// diplay messages from local storage
const storedMessages = JSON.parse(localStorage.getItem('messages'));
if (storedMessages != null) {
    storedMessages.forEach(message => {
        new Message(message.isMine, message.avatar, message.name, message.message, message.datetime, true).sendMessage();
    });
    scrollToBottom();
}


// Warning if API keys are not set
if (WEATHER_API_KEY == 'XXX' || MOVIES_API_KEY == 'XXX' || GIPHY_API_KEY == 'XXX' || CHATGPT_API_KEY == 'XXX') {
    new Message(false, bots[0].avatar, bots[0].name, `⚠️ Veuillez renseigner les clés d'API dans le fichier <strong>env.js</strong> ⚠️`).sendMessage();
}


submitButton.addEventListener('click', () => {
    let message = inputField.value;

    if (message == '') return;

    new Message(true, 'https://i.pravatar.cc/300', 'You', message).sendMessage();

    if (message.startsWith('/')) {
        let command = message.split(' ')[0];
        let args = message.split(' ').slice(1);
        new Command(command,args).execute();
    }
    inputField.value = '';
    inputField.focus();
    scrollToBottom();
});