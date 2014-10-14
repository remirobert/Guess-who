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
    for(var i = 0; i<characters.length; i++){

      if(characters[i]["isDead"]){
        count_alives -= 1 ;
        log('Alive : '+count_alives);
        if(count_alives == 1){
          endGame();
        }else{
          log(characters[i]);
          dom_characters[i].style.display="none";
        }
      }
    }

    step_kills = [];
  }

  function endGame(){
    log('-> endGame');
    canKill = canClue = false;
    correctError();
  }

  function correctError(){
    log('-> correctError');
  }

  function checkLimit(){
    console.log('test');
    var killed = getKilledCharacters();
    var merge = killed.concat(step_kills);
    console.log(merge);
    if(merge.length == characters.length-1){
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
