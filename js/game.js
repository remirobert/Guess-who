log('GAME');

window.addEventListener('load', (function(){
  //Stuff
  
  var characters = ['Jean', 'Rose', 'Eric', 'Marie'];
  var dom_characters = document.getElementsByClassName('character');

  init();

  function init(){
    handlerController();
  }

  function handlerController(){
    log(dom_characters);
    
    for(var i = 0 ; i < dom_characters.length; i++){
      dom_characters[i].addEventListener("click", killCharacter);
    }
  }

  function killCharacter(){
    log('kill character');
  }

}));