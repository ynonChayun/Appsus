export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    makeLorem,
    randName
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}


function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function makeLorem(length = 10) {
    const words = ["The sky", "above", "the port", "was", "the color of television", "tuned", "to", "a dead channel", ".", "All", "this happened", "more or less", ".", "I", "had", "the story", "bit by bit", "from various people", "and", "as generally", "happens", "in such cases", "each time", "it", "was", "a different story", ".", "It", "was", "a pleasure", "to", "burn"];

    var sentence = "";
    while (length--) {
        sentence += words[Math.floor(Math.random() * words.length)] + " ";
    }
    return sentence;

}

function randName() {
    const names = ["Yaron Biton", "Matan Crispel", "Third King Yuval Levi", "Inbar Tzvik", "Adam Bercovich", "Amir Inbar", "Rotem Bublil", "Dimaaa"]

    return names[Math.floor(Math.random() * names.length)]

}