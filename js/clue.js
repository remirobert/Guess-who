var clues = ["hair", "hat", "eye"];

function Clue() {
    this.prefix;
    this.attribut;
}

function generateListClue(selectedCharacter) {
    var listClue = [];

    for (index = 0; index < 5; index++) {
	var currentClue = new Clue();
	currentClue.attribut = clues[Math.floor(Math.random() * 3)];
	var attributValue = selectedCharacter[currentClue.attribut];

	if (attributValue == true) {
	    currentClue.prefix = "he has";
	}
	else {
	    currentClue.prefix = "he hasn't";
	}
	listClue[index] = currentClue;
    }
    log(listClue);
    return listClue;
}
