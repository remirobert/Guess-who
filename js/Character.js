function Character() {
    this.hair;
    this.hat;
    this.eye;
}

function initCharacter() {
    var dataJson = loadJSON("ressource/data/character.json");
    var parse = dataJson.characters[Math.floor((Math.random() * 3))];
    
    var selectedCharacter = new Character();
    selectedCharacter.hair = parse.hair;
    selectedCharacter.hat = parse.hat;
    selectedCharacter.eye = parse.eye;
    return selectedCharacter;
}
