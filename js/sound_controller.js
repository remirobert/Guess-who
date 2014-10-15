// FORMAT CLUE
var clue = {
    audio : ['test.ogg', 'test2.ogg', 'test3.ogg']
}

function runSoundSystem(string) {
    canSpeech = false;
    msgPrefix = new SpeechSynthesisUtterance(string);
    msgPrefix.rate = 0.8;
    msgPrefix.lang = 'en-US';
    window.speechSynthesis.speak(msgPrefix);

    msgPrefix.onend = function(event) {
	canSpeech = true;
	console.log('SONG OVER !!!!!!!');
    };
}

function playClue(currentClue) {
    runSoundSystem(currentClue.prefix + currentClue.attribut);
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
