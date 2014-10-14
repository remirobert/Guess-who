function Clue() {
    this.prefix;
    this.attribut;
}

function getRandomListClue(typeSexeCharacter) {
    var randomList = ["sexe"];
    var clueList = ["hair", "eye", "hat", "mask", "beard", "mustache"];

    if (typeSexeCharacter == "She ") {
	clueList.splice(4, 3);
    }
    var numberClue = clueList.length;

    for (index = 1; index < numberClue + 1; index++) {
	var randomIndex = Math.floor((Math.random() * (numberClue - index)));
	randomList[index] = clueList[randomIndex];
	cluelist = clueList.splice(clueList.indexOf(clueList[randomIndex]), 1);
    }
    return randomList;
}

function generateListClue(selectedCharacter) {
    var listClue = [];
    var clues = getRandomListClue(selectedCharacter.sexe);
    var currentClue = new Clue();

    currentClue.prefix = "";
    if (selectedCharacter.sexe == "She ") {
	currentClue.attribut = "She's a girl.";
    }
    else {
	currentClue.attribut = "He's a boy.";
    }
    listClue[0] = currentClue;
    for (index = 1; index < clues.length; index++) {
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
    return listClue;
}
