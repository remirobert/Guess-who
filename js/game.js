log(['---------------','GAME', '---------------']);

window.addEventListener('load', (function(){
  
  //Stuff
  var dom_characters, the_chosen_one;
  var characters = getCharacters();
  var container = document.getElementById('character_container');
  var step = 0;
  var canKill = false;
  var canClue = true;
  var clue_index = 0;
  var memoryKilled = 0;
  var step_kills = [];

  init();

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
      container.appendChild(c);
    }
    dom_characters = document.getElementsByClassName("character");
  }

  function createTheChosenOne(){
    log('-> Choose The Chosen One');
    var roll = Math.floor((Math.random() * characters.length) + 1);
    log(['The Chosen One is character ' + roll, characters[roll-1]]);
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
      var clue = 
      [
        {attribut: "a boy", prefix: "he is"},
        {attribut: "hat", prefix: "he has"},
        {attribut: "hair", prefix: "he hasn't"},
        {attribut: "hat", prefix: "he has"},
        {attribut: "eye", prefix: "he has"}
      ];

      log('CLUE : ' + clue[clue_index].prefix + ' ' + clue[clue_index].attribut);
      
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
      }else{
        log('KILL '+e.target.id);
        dom_characters[e.target.id].setAttribute('class', 'character dead');
        step_kills.push(e.target.id);
        canClue = true;
        memoryKilled += 1;
        log(memoryKilled);
      }
    }else{
      log('CAN NOT KILL');
    }
  }

  function cleanKills(){
    memoryKilled = 0;
    for(var i = 0; i<step_kills.length; i++){
      characters[step_kills[i]]['isDead'] = true;
    }
    for(var i = 0; i<characters.length; i++){
      if(characters[i]["isDead"]){
        log(characters[i]);
        dom_characters[i].style.display="none";
      }
    }
  }

}));