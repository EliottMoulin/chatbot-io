"useStricts";

let messageContainer = document.getElementById('message-container');
let botsContainer = document.getElementById('bots-container');
let submitButton = document.getElementById('submit-button');
let inputField = document.getElementById('input-field');
let commandsList = document.getElementById("command-list");
let commandAutocomplete = document.getElementById("command-autocomplete");

// Initialize bot
const ADMIN_BOT = new Bot(bots[0].nickname, bots[0].name, bots[0].avatar, bots[0].description, bots[0].parameters);
const WEATHER_BOT = new Bot(bots[1].nickname, bots[1].name, bots[1].avatar, bots[1].description, bots[1].parameters);
const MOVIE_BOT = new Bot(bots[2].nickname, bots[2].name, bots[2].avatar, bots[2].description, bots[2].parameters);
const GIF_BOT = new Bot(bots[3].nickname, bots[3].name, bots[3].avatar, bots[3].description, bots[3].parameters);

ADMIN_BOT.create();
WEATHER_BOT.create();
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

    new Message(true, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSve1KURcIup7UuJVn0N1NbVv1bSDXLVKooXg&usqp=CAU', 'You', message).sendMessage();

    if (message.startsWith('/')) {
        let command = message.split(' ')[0];
        let args = message.split(' ').slice(1);
        new Command(command, args).execute();
    }
    inputField.value = '';
    inputField.focus();
    scrollToBottom();
});

// Autocomplete commands

inputField.addEventListener("input", () => {
    if (inputField.value.startsWith("/")) {
        showCommandsList();
    } else {
        hideCommandsList();
    }
});

const showCommandsList = () => {
    commandsList.innerHTML = "";

    let autocompleteCommands = [];
    let searchValue = inputField.value.toLowerCase();

    commands.filter(command => {
        return command.split(' ')[0].startsWith(searchValue);
    }).forEach(command => {
        let commandName = command.split(' ')[0];
        if (!autocompleteCommands.includes(commandName)) {
            commandsList.innerHTML += `<li class="px-4 py-2 cursor-pointer rounded-md hover:bg-gray-300 " onclick="onClickCommand('${commandName}')">${commandName}</li>`;
            autocompleteCommands.push(commandName);
        }
    });

    if (autocompleteCommands.length != 0) {
        commandAutocomplete.classList.remove("hidden");
    } else {
        commandAutocomplete.classList.add("hidden");
    }

}

const onClickCommand = (command) => {
    inputField.value = command + ' ';
    hideCommandsList();
    inputField.focus();
}

const hideCommandsList = () => {
    commandAutocomplete.classList.add("hidden");
}