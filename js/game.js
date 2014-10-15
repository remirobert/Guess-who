log(['---------------','GAME', '---------------']);

function init_game(){
    
    //Stuff
    var dom_characters, dom_hands, the_chosen_one, count_alives, msgPrefix;
    var characters = getCharacters();
    var container = document.getElementById('character_container');
    var hand_container = document.getElementById('hands');
    var step = 0;
    var indexKill = 0;
    var canKill = false;
    var canClue = true;
    var limitReach = false;
    var clue_index = 0;
    var memoryKilled = 0;
    var step_kills = [];
    var dom_content = document.getElementById('content');
    var isError = false;
    var canSpeech = true;

    var error;
    function ErrorClue() {
	this.indexClue;
	this.character;
	this.currentWrongClue;
	this.currrentCharacterStat;
    }

    init();
    
    var listClueCharacter = generateListClue(the_chosen_one);
    launchClue();

    function init(){
    	log('-> Init');
    	createCharacters();
    	the_chosen_one = createTheChosenOne();
    	launchStep();

    	for(var i = 0 ; i < dom_characters.length; i++){
    	    dom_hands[i].addEventListener("click", killCharacter);
    	}
    }

    function handlers(){
	document.getElementById('home').addEventListener('click', return_home);
	document.getElementById('text_clue').addEventListener('click', help_clue);
	document.getElementById('replay').addEventListener('click', replay_sound);
	document.getElementById('clue').addEventListener('click', launchClue);
    }

    function nav_home(){
	console.log('nav_home');
    }

    function help_clue(){
	var popup = document.getElementById("pop")
	popup.style.opacity = 1.0;

	console.log('help_clue');
	printContent(listClueCharacter[clue_index-1].prefix + ' ' + listClueCharacter[clue_index-1].attribut);
    }

    function replay_sound(){
	runSoundSystem(listClueCharacter[clu])
	playClue(listClueCharacter[clue_index-1]);
    }

    function printContent(c){
	dom_content.textContent = c;
    }

    function createCharacters(){
    	log('-> Creation of the Characters');
    	for (var i = 0 ; i < characters.length ; i++){
            var charbox = document.createElement('div');
            charbox.setAttribute('class', 'charbox');
            container.appendChild(charbox);

    	    var c = document.createElement('img');
    	    c.setAttribute("id", i);
    	    c.setAttribute("class", "character");
            c.src = 'ressource/img/characters/' + (characters[i].id + 1) + '.png';
    	    charbox.appendChild(c);

            var h = document.createElement('img');
            h.setAttribute("id", i);
            h.setAttribute("class", "hands");
            h.src = 'ressource/img/characters/' + 'hands_' + (characters[i].id + 1) + '.png';
            hand_container.appendChild(h);

    	}
    	dom_characters = document.getElementsByClassName("character");
	    dom_hands = document.getElementsByClassName("hands");
    	count_alives = characters.length;
    }

    function createCharactersFail(){
    	log('-> Creation of the Characters on FAIL');
    	for (var i = 0 ; i < error.currrentCharacterStat.length; i++) {
	    if (error.currrentCharacterStat[i].isDead == false) {
    		var c = document.createElement('img');
    		c.setAttribute("id", i);
    		c.setAttribute("class", "character");
		c.src = 'ressource/img/characters/' + (error.currrentCharacterStat[i].id + 1) + '.png';
    		container.appendChild(c);

		var h = document.createElement('img');
		h.setAttribute("id", i);
		h.setAttribute("class", "hands");
		h.src = 'ressource/img/characters/' + 'hands_' + (error.currrentCharacterStat[i].id + 1) + '.png';
		hand_container.appendChild(h);
	    }
    	}
    	dom_characters = document.getElementsByClassName("character");
	dom_hands = document.getElementsByClassName("hands");
    	count_alives = characters.length;
	handlers();
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

	handlers();
    }

    function launchClue(){
    	cleanKills();

	if (canSpeech == false) {
	    return ;
	}
	
	if (tryCluesCharacters(characters, listClueCharacter[clue_index]) == false) {
	    clue_index += 1;
	}
	

	var popup = document.getElementById("pop")
	popup.style.opacity = 0.0;

	if (clue_index > listClueCharacter.length) {
	    return;
	}

	console.log("INDEX KILL  = " + indexKill);

	if (indexKill == 11) {
	    for (index = 0; index < characters.length; index++) {
		  if (characters[index].isDead == false) {
		    if (the_chosen_one.id == characters[index].id) {
			runSoundSystem("you win congratulations !");
			console.log("WIN THE GAME");
			endGame(true, the_chosen_one);
		    }
		    else {
			runSoundSystem("you loose try again !");
			console.log("YOU LOOSE");
			endGame(false);

		    }
		  }
	    }
	}
	
    	log('-> Launch Clue');

    	if(canClue){
            document.getElementById('clue').style.display="inline-block";
            dom_content.textContent = "";
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

	if (isError == false && characters[e.target.id].id == the_chosen_one.id) {
	    isError = true;
	    console.log("............................... error target GAME OVER");
	    error = new ErrorClue();
	    error.character = the_chosen_one;
	    error.currentWrongClue = listClueCharacter[clue_index]; 
	    error.currrentCharacterStat = characters;
	    error.indexClue = clue_index;
	    //endGame();
	}
    	if(canKill){
    	    if(step_kills.indexOf(e.target.id)>=0) {
    		log('REVIVE '+e.target.id);
    		dom_characters[e.target.id].setAttribute('class', 'character reviving bouncerevive');
    		step_kills.splice(step_kills.indexOf(e.target.id),1);
    		memoryKilled -= 1;
    		log(memoryKilled);
		indexKill -= 1;
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
		    indexKill += 1;
    		    log('KILL '+e.target.id);
    		    dom_characters[e.target.id].setAttribute('class', 'character dead animated bounce');
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


	for(var i = 0; i<characters.length; i++){
	    if(characters[i]["isDead"]){
		log(characters[i]);
		dom_characters[i].style.opacity=0;
	    }
	}
	step_kills = [];
    }

    function endGame(win){
    	log('-> endGame');
    	canKill = canClue = false;
        view_endGame(win);
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

    function view_endGame(win){
        removeView();
        if(win){
            appendScreenWin();
        }else{
            appendScreenLoose(); 
        }
    }

    function appendScreenWin(){
        var container_perso = document.createElement("div");
        container_perso.id = "perso";
        wrapper.appendChild(container_perso);
        var perso = document.createElement("img");
        id_chosen = the_chosen_one['id'];
        perso.id = "perso-win";
        perso.src="ressource/img/characters/persos/" + 'perso-'+id_chosen+'.png';
        container_perso.appendChild(perso);

        var cadre = document.createElement("div");
        cadre.id = "cadre";
        wrapper.appendChild(cadre);

        var ct1 = document.createElement("p");
        ct1.textContent = "Congratulations !";
        cadre.appendChild(ct1);

        var ct2 = document.createElement("p");
        ct2.textContent = "You win !";
        cadre.appendChild(ct2);

        var medal = document.createElement("div");
        medal.id = "medal";
        wrapper.appendChild(medal);

        var btn = document.createElement("div");
        btn.setAttribute("class", "picto");
        btn.addEventListener('click', return_home);
        btn.id = "return_h";
        wrapper.appendChild(btn);
    }

    function appendScreenLoose(){
        var container_perso = document.createElement("div");
        container_perso.id = "perso";
        wrapper.appendChild(container_perso);
        var perso = document.createElement("img");
        id_chosen = the_chosen_one['id'];
        perso.id = "perso-win";
        perso.src="ressource/img/characters/persos/" + 'silhouette-'+id_chosen+'.png';
        container_perso.appendChild(perso);

        var cadre = document.createElement("div");
        cadre.id = "cadre";
        wrapper.appendChild(cadre);

        var ct1 = document.createElement("p");
        ct1.textContent = "Try again !";
        cadre.appendChild(ct1);

        var ct2 = document.createElement("p");
        ct2.textContent = "Next time, I'm sure you will find me !";
        cadre.appendChild(ct2);

        var btn = document.createElement("div");
        btn.setAttribute("class", "picto");
        btn.addEventListener('click', return_home);
        btn.id = "return_h";
        wrapper.appendChild(btn);
    }

    function return_home(){
        window.location.reload();
    }

    function removeView(){
        var myWrapper = document.getElementById("wrapper");
        while (myWrapper.firstChild) {
            myWrapper.removeChild(myWrapper.firstChild);
        }
    }

}
