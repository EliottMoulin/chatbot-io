class Message {

    constructor(isMine, avatar, name, message, datetime = new Date().toLocaleString().replace(' ', ' à ').replace(/:..$/, ''), isFromStorage = false) {
        this.isMine = isMine;
        this.avatar = avatar;
        this.name = name;
        this.message = message;
        this.datetime = datetime;
        this.isFromStorage = isFromStorage;
    }

    sendMessage() {
        let html;
        let messageContent = this.message;
    
        if ((this.message.startsWith('http://') || this.message.startsWith('https://')) && (this.message.endsWith('.jpg') || this.message.endsWith('.png') || this.message.endsWith('.gif') || this.message.endsWith('&ct=g'))) {
            messageContent = `<img src="${this.message}" alt="image" class="max-w-full" onload="scrollToBottom()">`;
        }
    
        if (this.isMine) {
            html = `
            <div class="flex items-start mb-4 justify-end">
                <img src="${this.avatar}" alt="avatar" class="w-8 h-8 rounded-full mr-2 object-cover border whitespace-nowrap">
                <div class="bg-blue-500 rounded-lg px-3 py-2 text-white self-end whitespace-normal">
                    <p class="text-sm">${this.message}</p>
                    <span class="text-xs text-gray-400">${this.datetime}</span>
                </div>
            </div>`
        } else {
            html = `
            <div class="flex items-start mb-4">
                <img src="${this.avatar}" alt="avatar" class="w-10 h-10 rounded-full mr-3 object-cover border whitespace-nowrap">
                <div class="flex flex-col">
                    <span class="font-semibold">${this.name}</span>
                    <div class="bg-gray-100 rounded-lg px-3 py-2 mt-2 whitespace-normal">
                        <div class="text-gray-600 text-sm">${messageContent}</div>
                        <span class="text-gray-400 text-xs">${this.datetime}</span>
                    </div>
                </div>
            </div>`;
        }
    
        messageContainer.innerHTML += html;
        
        if (!this.isFromStorage) this.saveMessage(this.isMine, this.avatar, this.name, this.message, this.datetime);
    }

    saveMessage(isMine, avatar, name, message, datetime) {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ isMine, avatar, name, message, datetime });
        localStorage.setItem('messages', JSON.stringify(messages));
    }
}