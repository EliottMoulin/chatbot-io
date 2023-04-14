"useStricts";

const bots = [
    {
        name: 'Mohamed Mossad',
        description: 'Bot - Météo',
        avatar: 'https://pbs.twimg.com/media/EEdYYn7WwAEcPaI.jpg',
        response : 'Salam aleykoum, il fait bien beau aujourd\'hui'
    },      
    {
        name: 'Christopher Nol Âne',
        description: 'Bot - Films',
        avatar: 'https://pbs.twimg.com/profile_images/583674329990361088/UlQJ24vU_400x400.jpg',
        response : 'Tenet ou t\'es pas net ?'
    },  
    {
        name: 'Gaston laGiffe',
        description: 'Bot - Gifs',
        avatar: 'https://www.ln24.be/sites/default/files/styles/full_no_crop/public/2022-03/Le-retour-de-Lagaffe-2.jpg?itok=-WGc16b0',
        response : 'https://media1.giphy.com/media/13GgTtFZZDIcjttYXg/giphy.gif'
    },   
]

const commands = ['/help', '/clear', '/hello']

let messageContainer = document.getElementById('message-container');
let submitButton = document.getElementById('submit-button');
let inputField = document.getElementById('input-field');

const getMessageHtml = (isMine, avatar, name, message) => {
    let datetime = new Date().toLocaleTimeString();
    let messageContent = message;
    if ((message.startsWith('http://') || message.startsWith('https://')) && (message.endsWith('.jpg') || message.endsWith('.png') || message.endsWith('.gif'))) {
      messageContent = `<img src="${message}" alt="image" class="max-w-full">`;
    }
    if (isMine) {
        return `
            <div class="flex items-start mb-4 justify-end">
                <div class="bg-blue-500 rounded-lg px-3 py-2 text-white self-end">
                    <p class="text-sm">${message}</p>
                    <span class="text-xs text-gray-400">${datetime}</span>
                </div>
                <img src="${avatar}" alt="avatar" class="w-8 h-8 rounded-full ml-2">
            </div>`;
    } else {
        return `
        <div class="flex items-start mb-4">
            <img src="${avatar}" alt="avatar" class="w-10 h-10 rounded-full mr-3 border">
            <div class="flex flex-col">
                <span class="font-semibold">${name}</span>
                <div class="bg-gray-100 rounded-lg px-3 py-2 mt-2">
                    <div class="text-gray-600 text-sm">${messageContent}</div>
                    <span class="text-gray-400 text-xs">${datetime}</span>
                </div>
            </div>
        </div>`;
    }
};

const executeCommand = (command) => {
    switch (command) {
        case '/help':
            messageContainer.innerHTML += `
                <div class="flex items-center mb-4 ml-12">
                    <span class="text-gray-400 mr-2">Commandes :</span>
                    ${commands.map(c => `<span class="bg-gray-100 rounded-lg px-3 py-1 text-gray-600 text-sm mr-2">${c}</span>`).join('')}
                </div>`;
            break;

        case '/clear':
            messageContainer.innerHTML = '';
            break;

        case '/hello':
            bots.forEach(bot => messageContainer.innerHTML += getMessageHtml(false, bot.avatar, bot.name, bot.response));
            break;
    }
}


submitButton.addEventListener('click', () => {
    let message = inputField.value;
    
    if (message == '') return;

    messageContainer.innerHTML += getMessageHtml(true, 'https://i.pravatar.cc/300', 'You', message);

    if (message.startsWith('/') && commands.includes(message)) {
        executeCommand(message);
    } 

        inputField.value = '';
    inputField.focus();
    messageContainer.scrollTop = messageContainer.scrollTopMax;
});