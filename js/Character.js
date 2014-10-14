function Character() {
    this.isDead;
    this.sexe;
    this.hair;
    this.hat;
    this.eye;
    this.mask;
    this.beard;
    this.mustache;
    this.id;
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
    return selectedCharacter;
}

function randomParseArray() {
    var randomArray = [];
    var arrayIndex = [0, 1, 2];

    for (index = 0; index < 3; index++) {
	var randomIndex = Math.floor((Math.random() * (3 - index)));
	randomArray[index] = arrayIndex[randomIndex]
	arrayIndex.splice(arrayIndex.indexOf(arrayIndex[randomIndex]), 1);
    }
    return randomArray;
}

function getCharacters() {
    var characterList = [];
    var arrayIndex = randomParseArray();

    for (index = 0; index < 3; index++) {
	characterList[index] = initCharacter(arrayIndex[index]);
    }
    return characterList;
}
