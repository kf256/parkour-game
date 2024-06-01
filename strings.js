// lists of strings in various languages
const languages = {};
languages.en = {start: "start the game", title: "Parkour game", won: "You won! Well done!", lost: "Oh, no! You lost. Never mind! Try again!"};
languages.de = {start: "Spiel starten", title: "Parkourspiel", won: "Du hast gewonnen! Gut gemacht!", lost: "Oh, nein! Du hast verloren. Aber das macht nichts! Versuch's doch noch mal!"};

// object that will contain various texts in the player's language
const strings = {};

function transferLanguage(language) {
    // if the language is not known, try to use just the first two characters
    if (languages[language] === undefined) language = language.slice(0, 2);
    
    // if the language is still not known, skip it
    if (languages[language] === undefined) return;
    
    // tranfer the strings in the language
    const keys = Object.keys(languages[language]);
    for (let i = 0; i < keys.length; i++) {
        strings[keys[i]] = languages[language][keys[i]];
    }
}

// first, transfer English as the default language
transferLanguage("en");

// iterate through the player's languages in reverse order and transfer them to the strings object
for (let i = navigator.languages.length-1; i >= 0; i--) {
    transferLanguage(navigator.languages[i]);
    
}

// export strings
export {strings};