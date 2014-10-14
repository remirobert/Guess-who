log(['---------------','GAME', '---------------']);

window.addEventListener('load', (function(){
  
  //Stuff
  var dom_characters, the_chosen_one;;
  var characters = loadJSON('ressource/data/character.json').characters;
  var container = document.getElementById('character_container');
  var step = 0;
  var cankill = false;

  init();

  function init(){
    log('-> Init');
    createCharacters();
    the_chosen_one = createTheChosenOne();
    launchStep();

    handlerController();
  }

  function createCharacters(){
    log('-> Creation of the Characters');
    for (var i = 1 ; i <= characters.length ; i++){
      var c = document.createElement('div');
      c.setAttribute("id", "character"+i);
      c.setAttribute("class", "character");
      c.textContent = "Character "+i;
      container.appendChild(c);
    }
    dom_characters = document.getElementsByClassName("character");
  }

  function createTheChosenOne(){
    log('-> Choose The Chosen One');
    var roll = Math.floor((Math.random() * characters.length) + 1);
    log(['The Chosen One is character ' + roll, characters[roll]]);
  }

  function launchStep(){
    log('-> Launch Step');
    log('Etape : ' + step);
  }

  function handlerController(){
    for(var i = 0 ; i < dom_characters.length; i++){
      dom_characters[i].addEventListener("click", killCharacter);
    }
  }

  function killCharacter(e){
    if(canKill){
      log('KILL '+e.target.id);
    }else{
      log('CAN NOT KILL');
    }
  }

  function needClue(){
    if(canClue){
      log('GIVE CLUE');
    }else{
      log('CAN NOT GIVE CLUE');
    }
  }

}));