
function Character() {
    this.hair;
    this.hat;
    this.eye;
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
	if(rawFile.readyState === 4)
	{
	    if(rawFile.status === 200 || rawFile.status == 0)
	    {
		var allText = rawFile.responseText;
		alert(allText);
	    }
	}
    }
    rawFile.send(null);
}

function initCharacter() {
    readTextFile("ressources/character.json");

    var randCharacter = Math.floor((Math.random() * 3));
    console.log(randCharacter);

    var parse = JSON.parse(text).characters[randCharacter];

    var selectedCharacter = new Character();
    selectedCharacter.hair = parse.hair;
    selectedCharacter.hat = parse.hat;
    selectedCharacter.eye = parse.eye;
    return selectedCharacter;
}
