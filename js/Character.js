
function Character() {
    this.hair;
    this.hat;
    this.eye;
}


function initCharacter() {
    loadJSON("ressource/data/character.json",
             function(data) { 
		 console.log('data json get ' + data); 
		 dataJsonFile = data;
	     },
             function(xhr) { console.error(xhr); 
			     return;
			   }
	    );

/*    
    var randCharacter = Math.floor((Math.random() * 3));
    console.log(randCharacter);

    var parse = JSON.parse(dataJsonFile).characters[randCharacter];
*/
    var selectedCharacter = new Character();
/*
    selectedCharacter.hair = parse.hair;
    selectedCharacter.hat = parse.hat;
    selectedCharacter.eye = parse.eye;*/
    return selectedCharacter;

}
