class Bot {
    constructor(nickname, name, avatar, description, parameters) {
        this.nickname = nickname;
        this.name = name;
        this.avatar = avatar;
        this.description = description;
        this.parameters = parameters;
    }

    create() {
        botsContainer.innerHTML += `
        <li class="px-5 py-2 flex items-center">
            <img src="${this.avatar}" alt="avatar" class="w-10 h-10 rounded-full object-cover mr-3">
            <div class="flex flex-col">
            <span class="text-gray-300 font-semibold">${this.name}</span>
            <span class="text-gray-400 text-sm">${this.description}</span>
            </div>
            <div class="ml-auto h-4 w-4 bg-green-500 rounded-full"></div>
        </li>`;
    }

}