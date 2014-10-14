
function Character() {
    this.hair;
    this.hat;
    this.eye;
}

function initCharacter() {
    var text = '{ "characters" : [' +
	'{ "hair": false, "hat": false,  "eye": false },' +
	'{ "hair": false, "hat": false,  "eye": true },' +
	'{ "hair": true, "hat": true,  "eye": false } ]}';

    var randCharacter = Math.floor((Math.random() * 3));
    console.log(randCharacter);

    var parse = JSON.parse(text).characters[randCharacter];

    var selectedCharacter = new Character();
    selectedCharacter.hair = parse.hair;
    selectedCharacter.hat = parse.hat;
    selectedCharacter.eye = parse.eye;
    return selectedCharacter;
}
