function Character() {
    this.isDead;
    this.sexe;
    this.hair;
    this.hat;
    this.eye;
    this.mask;
    this.beard;
    this.mustache;
}

function initCharacter(index) {
    var dataJson = loadJSON("ressource/data/character.json");
    var parse = dataJson.characters[index];

    var selectedCharacter = new Character();
    selectedCharacter.isDead = false;
    selectedCharacter.hair = parse.attribut[0]["hair"];
    selectedCharacter.hat = parse.attribut[0]["hat"];
    selectedCharacter.eye = parse.attribut[0]["eye"];
    selectedCharacter.mask = parse.attribut[0]["mask"];
    selectedCharacter.beard = parse.attribut[0]["beard"];
    selectedCharacter.mustache = parse.attribut[0]["mustache"];

    if (parse.sexe == 0) {
	selectedCharacter.sexe = "He ";
    }
    else {
	selectedCharacter.sexe = "She ";
    }
    log(selectedCharacter);
    return selectedCharacter;
}

function getCharacters() {
    var characterList = [];

    console.log("GET");
    for (index = 0; index < 3; index++) {
	characterList[index] = initCharacter(index);
    }
    return characterList;
}
