const bots = [
    {
        name: 'PapAdmin',
        nickname: 'admin',
        description: 'Bot - Admin',
        avatar: 'https://www.gala.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2F2c7551dc-999d-42d1-8020-81bcab3a2d92.2Ejpeg/2048x1536/quality/80/pape-francois.jpeg',
        response : 'Bienvenue sur le chat !',
        parameters: []
    },
    {
        name: 'Mohamed Mossad',
        nickname: 'momo',
        description: 'Bot - Météo',
        avatar: 'https://pbs.twimg.com/media/EEdYYn7WwAEcPaI.jpg',
        response : 'Salam aleykoum, il fait bien beau aujourd\'hui',
        parameters : ['temp', 'cloud', 'wind']
    },      
    {
        name: 'Christopher Nol Âne',
        nickname: 'christ',
        description: 'Bot - Films',
        avatar: 'https://pbs.twimg.com/profile_images/583674329990361088/UlQJ24vU_400x400.jpg',
        response : 'Tenet ou t\'es pas net ?',
        parameters: ['trend', 'bad', 'best']
    },  
    {
        name: 'Gaston laGiffe',
        nickname: 'gaston',
        description: 'Bot - Gifs',
        avatar: 'https://www.ln24.be/sites/default/files/styles/full_no_crop/public/2022-03/Le-retour-de-Lagaffe-2.jpg?itok=-WGc16b0',
        response : 'https://media1.giphy.com/media/13GgTtFZZDIcjttYXg/giphy.gif',
        parameters: ['random', 'trend', 'search']
    },   
];

const commands = [
    "/help -> Liste les commandes possibles",
    "/clear -> Supprime les messages du chat",
    "/hello -> Fais parler tous les bots<br>",
    "/weather temp {ville} -> Affiche la température dans une ville",
    "/weather wind {ville} -> Affiche la vitesse du vent dans une ville",
    "/weather cloud {ville} -> Affiche le pourcentage de nuages dans une ville<br>",
    "/movie trend -> Affiche les films tendance de la semaine",
    "/movie bad {year} -> Affiche les 10 pires films de l'année choisie",
    "/movie best {year} -> Affiche les 10 meilleurs films de l'année choisie<br>",
    "/gif trend {number} -> Affiche un nombre de gif choisi",
    "/gif random -> Affiche un gif aléatoire",
    "/gif search {query} -> Affiche 10 gifs en fonction d'un mot clé<br>",
    "/gpt {bot} {prompt} -> Affiche une réponse de chatGpt pour un bot choisi (admin, momo, christ, gaston) en fonction d'un prompt"
];