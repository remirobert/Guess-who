function Clue() {
    this.prefix;
    this.attribut;
}

function getRandomListClue() {
    var randomList = ["sexe"];
    var clueList = ["hair", "eye", "hat", "mask", "beard", "mustache"];

    for (index = 1; index < 7; index++) {
	var randomIndex = Math.floor((Math.random() * (7 - index)));
	randomList[index] = clueList[randomIndex];
	cluelist = clueList.splice(clueList.indexOf(clueList[randomIndex]), 1);
    }
    return randomList;
}

function generateListClue(selectedCharacter) {
    var listClue = [];

    var clues = getRandomListClue();
    log(clues);
    
    var currentClue = new Clue();
    currentClue.prefix = "";
    if (selectedCharacter.sexe == "She ") {
	currentClue.attribut = "I am a girl.";
    }
    else {
	currentClue.attribut = "I am a boy.";
    }
    listClue[0] = currentClue;
    for (index = 1; index < 7; index++) {
	var currentClue = new Clue();
	currentClue.attribut = clues[index];
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
