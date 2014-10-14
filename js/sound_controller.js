// FORMAT CLUE
var clue = {
  audio : ['test.ogg', 'test2.ogg', 'test3.ogg']
}

// TEST SOUND CONTROLLER
//log(['---------------','SOUND CONTROLLER', '---------------']);
//window.addEventListener('load', (function(){
//  launchSounds(clue);
//}), false);

/* -----------------------------------------------------------------------------
                            Sound Controller
----------------------------------------------------------------------------- */

function playClue(currentClue) {
    var msgPrefix = new SpeechSynthesisUtterance(currentClue.prefix + currentClue.attribut);
    window.speechSynthesis.speak(msgPrefix);
}

function launchSounds(clue){
  var player = {
    controller : document.getElementById("sound_controller"),
    rep : 'ressource/sound/',
    buffer : 0,
    nb_sounds : clue.audio.length-1,
    clue : clue
  }
  playSound(player);
}

function playSound(player){
  log('-> playing :' + player.clue.audio[player.buffer]);

  player.controller.play();
  player.controller.addEventListener('ended', function(e){
    if(player.buffer<player.nb_sounds){
      player.buffer += 1;
      player.controller.setAttribute("src", player.rep+player.clue.audio[player.buffer]);
      playSound(player);
    }else{
      bufferOnFinished();
    }
  }, false);
}

function bufferOnFinished(){
  log(['FIN DES SONS']);
}
