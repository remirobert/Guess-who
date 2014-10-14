var clues = ["hair", "hat", "eye"];

function Clue() {
    this.prefix;
    this.attribut;
}

function getRandomListClue() {
    var randomList = ["sexe"];
    var clueList = ["hair", "eye", "hat", "mask", "beard", "mustache"];

    for (index = 0; index < 5; index++) {
	var randomIndex = Math.floor((Math.random() * (6 - index)));
	randomList[index + 1] = clueList[randomIndex];
	cluelist = clueList.splice(clueList.indexOf(clueList[randomIndex]), 1);
    }
    return randomList;
}

function generateListClue(selectedCharacter) {
    var listClue = [];

    getRandomListClue();
    for (index = 0; index < 5; index++) {
	var currentClue = new Clue();
	currentClue.attribut = clues[Math.floor(Math.random() * 3)];
	var attributValue = selectedCharacter[currentClue.attribut];
	
	var prefix = selectedCharacter.sexe;
	var currentAttribut = null
	if (attributValue != null) {
	    prefix += " has";
	    currentAttribut = attributValue + " " + currentClue.attribut;
	}
	else {
	    prefix += " hasn't";
	    currentAttribut = currentClue.attribut;
	}
	currentClue.prefix = prefix;
	currentClue.attribut = currentAttribut;
	listClue[index] = currentClue;
    }
    log(listClue);
    return listClue;
}
