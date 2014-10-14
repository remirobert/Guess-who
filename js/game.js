log(['---------------','GAME', '---------------']);

window.addEventListener('load', (function(){
    
    //Stuff
    var dom_characters, the_chosen_one, count_alives;
    var characters = getCharacters();
    var container = document.getElementById('character_container');
    var step = 0;
    var canKill = false;
    var canClue = true;
    var limitReach = false;
    var clue_index = 0;
    var memoryKilled = 0;
    var step_kills = [];
    init();
    
    var listClueCharacter = generateListClue(the_chosen_one);
    launchClue();

    function init(){
	log('-> Init');
	createCharacters();
	the_chosen_one = createTheChosenOne();
	launchStep();

	for(var i = 0 ; i < dom_characters.length; i++){
	    dom_characters[i].addEventListener("click", killCharacter);
	}
    }

    function createCharacters(){
	log('-> Creation of the Characters');
	for (var i = 0 ; i < characters.length ; i++){
	    var c = document.createElement('div');
	    c.setAttribute("id", i);
	    c.setAttribute("class", "character");
	    c.textContent = "Character "+i;
	    var img = document.createElement('img');
	    img.src = 'ressource/img/' + (characters[i].id + 1) + '.png';
	    console.log(characters[i]);
	    c.appendChild(img);
	    container.appendChild(c);
	}
	dom_characters = document.getElementsByClassName("character");
	count_alives = characters.length;
    }

  function createTheChosenOne(){
    log('-> Choose The Chosen One');
    var roll = Math.floor((Math.random() * characters.length) + 1);
    log(['The Chosen One is character ' + roll, characters[roll-1]]);
    return characters[roll-1];
  }

  function launchStep(){
    log('-> Launch Step');
    log('Etape : ' + step);
    document.getElementById('clue').addEventListener("click", launchClue);
  }

    function launchClue(){
	cleanKills();
	
	log('-> Launch Clue');
	if(canClue){
	    playClue(listClueCharacter[clue_index]);
	    log(the_chosen_one);
	    
	    log('CLUE : ' + listClueCharacter[clue_index].prefix + ' ' + listClueCharacter[clue_index].attribut);
	    
	    clue_index += 1;
	    step += 1;
	    log('Etape : ' + step);
	    canKill = true;
	    canClue = false;
	}else{
	    log("CAN'T CLUE FOR NOW");
	}
    }

    function killCharacter(e){
	log('-> Action Character');
	checkLimit();

	if(canKill){
	    if(step_kills.indexOf(e.target.id)>=0){
		log('REVIVE '+e.target.id);
		dom_characters[e.target.id].setAttribute('class', 'character');
		step_kills.splice(step_kills.indexOf(e.target.id),1);
		memoryKilled -= 1;
		log(memoryKilled);
		if(memoryKilled <= 0){
		    canClue = false;
		}
		if(limitReach==true){
		    limitReach = false;
		}
	    }else{
		if(limitReach==true){
		    log('CAN NOT KILL : LIMIT');
		}else{
		    log('KILL '+e.target.id);
		    dom_characters[e.target.id].setAttribute('class', 'character dead');
		    step_kills.push(e.target.id);
		    canClue = true;
		    memoryKilled += 1;
		    log(memoryKilled);
		}
	    }
	}else{
	    log('CAN NOT KILL');
	}
    }

  function cleanKills(){
    memoryKilled = 0;

    for(var i = 0; i<step_kills.length; i++){
      characters[step_kills[i]]['isDead'] = step;
    }

    var deads_char = document.getElementsByClassName('dead');
    var nb_lefts = characters.length - deads_char.length;
    count_alives = nb_lefts;
    log('Alive : '+count_alives);

    if(count_alives == 1){
      endGame();
    }

    for(var i = 0; i<characters.length; i++){
      if(characters[i]["isDead"]){
          log(characters[i]);
          dom_characters[i].style.display="none";
          // var c = characters[i];
          // var r = clue;
          // correctError(c, r);     
      }
    }

    step_kills = [];
  }

  function endGame(){
    log('-> endGame');
    canKill = canClue = false;
    // correctError();
  }

  function correctError(character, r){
    // log('-> correctError');
    // console.log(r[clue_index].prefix);
    // console.log(r[clue_index].attribut);

    // var p = r[clue_index].prefix;
    // var a = r[clue_index].attribut;

    // if(p == 'She has' || p == 'He has'){
    //   if(
    //     (a == 'brown mustache' && character.mustache == "brown") ||
    //     (a == 'blond mustache' && character.mustache == "blond") ||
    //     (a == 'beard' && character.beard == "") ||
    //     (a == 'blond hair' && character.hair == "blond") ||
    //     (a == 'black hair' && character.hair == "black") ||
    //     (a == 'brown hair' && character.hair == "brown") ||
    //     (a == 'red hair' && character.hair == "red") ||
    //     (a == 'green eye' && character.eye == "green") ||
    //     (a == 'brown eye' && character.eye == "green") ||
    //     (a == 'blue eye' && character.eye == "green") ||
    //     (a == 'hat' && character.hat == "") ||
    //     (a == 'green mask' && character.mask == "green") ||
    //     (a == 'blue mask' && character.mask == "blue") ||
    //     (a == 'red mask' && character.mask == "red") ||
    //     (a == 'black mask' && character.mask == "black")
    //     ){
    //     console.log('JUSTE');
    //   }else{
    //     console.log('FAUX');
    //   }
    // }else{
    //   if(
    //     (a == 'mustache' && character.mustache == null) ||
    //     (a == 'beard' && character.beard == null) ||
    //     (a == 'hair' && character.hair == null) ||
    //     (a == 'hat' && character.hat == null) ||
    //     (a == 'mask' && character.mask == null)
    //     ){
    //     console.log('JUSTE');
    //   }else{
    //     console.log('FAUX');
    //   }
    // }

    // if(clue_index == 0){

    // }

  }

  function checkLimit(){
    var last_char = document.getElementsByClassName('dead');
    console.log('DEBUG :');
    console.log(last_char.length);
    if(last_char.length == characters.length-1){
      console.log('ATTENTION NE PEUX PAS SUPPRIMER LE DERNIER');
      limitReach = true;
    }
  }

    function getKilledCharacters(){
    	var tab = [];
    	for(var i = 0; i<characters.length; i++){
  	    if(characters[i]['isDead']){
    		  tab[i] = characters[i];
  	    }
    	}
    	return tab;
    }


}));

