"useStricts";

const commands = ['/help', '/clear']

let messageContainer = document.getElementById('message-container');
let submitButton = document.getElementById('submit-button');
let inputField = document.getElementById('input-field');

const getMessageHtml = (isMine, avatar, name, message) => {
    let datetime = new Date().toLocaleTimeString();
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
            <img src="${avatar}" alt="avatar" class="w-10 h-10 rounded-full mr-3">
            <div class="flex flex-col">
                <span class="font-semibold">${name}</span>
                <div class="bg-gray-100 rounded-lg px-3 py-2 mt-2">
                    <p class="text-gray-600 text-sm">${message}</p>
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
    }
}


submitButton.addEventListener('click', () => {
    let message = inputField.value;
    
    if (message == '') return;

    messageContainer.innerHTML += getMessageHtml(true, 'https://i.pravatar.cc/300', 'You', message);
    inputField.value = '';
    inputField.focus();
    messageContainer.scrollTop = messageContainer.scrollHeight;

    if (message.startsWith('/') && commands.includes(message)) {
        executeCommand(message);
    }
    
});