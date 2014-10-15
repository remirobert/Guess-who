window.addEventListener('load', (function(){
  var wrapper = document.getElementById('wrapper');
  var options = {
    theme : 0,
    difficulty : 0
  };

  init();

  function init(){
    view_theme();
  }

  function view_theme(){
    appendTitle('Choose your universe !');
    appendThemes();
  }

  function appendTitle(content){
    var c = document.createElement("div");
    c.setAttribute("class", "title");
    wrapper.appendChild(c);
    c.textContent = content;
  }

  function appendThemes(){
    var c = document.createElement("div");
    c.id = "container_theme";
    wrapper.appendChild(c);

    for(var i=1; i<=6; i++){
      var t = document.createElement("div");
      t.setAttribute("class", "theme");
      t.id = i;
      c.appendChild(t);

      var img = document.createElement("img");
      img.src = "ressource/img/theme/theme" + i + ".png";
      img.setAttribute("class", "lktheme");
      img.id = i;
      t.appendChild(img);
      t.addEventListener('click', chooseTheme);
    }
  }

  function chooseTheme(e){
      options.theme = e.target.id;
      removeView();
      view_difficulty();
  }

  function removeView(){
    var myWrapper = document.getElementById("wrapper");
    while (myWrapper.firstChild) {
        myWrapper.removeChild(myWrapper.firstChild);
    }
  }

  function view_difficulty(){
    appendTitle('Choose your level');
    appendDifficulties();
  }

  function appendDifficulties(){
    var difficulties = ['Easy', 'Medium', 'Hard'];

    var c = document.createElement("div");
    c.id = "container_difficulties";
    wrapper.appendChild(c);

    for(var i = 0; i < difficulties.length; i++){
      var d = document.createElement("div");
      d.setAttribute("class", "difficulty");
      d.setAttribute("name", i);
      d.id = 'diff' + i;
      d.addEventListener('click', chooseDifficulty);
      c.appendChild(d);
    }
  }

  function chooseDifficulty(e){
    options.difficulty = e.target.name;
    removeView();
    view_game();
  }

  function view_game(){
    var c = document.createElement("div");
    c.id = "character_container";
    wrapper.appendChild(c);
    var h = document.createElement("div");
    h.id = "hands";
    wrapper.appendChild(h);
   

    var cont = document.createElement("div");
    cont.id="conteneur_bottom";
    wrapper.appendChild(cont);
       var p = document.createElement("div");
       p.id = "pop";
       cont.appendChild(p);
          var i = document.createElement("img");
          i.src = "ressource/img/general/bulle.png";
          p.appendChild(i);
          var co = document.createElement("img");
          co.id = "content";
          p.appendChild(co);

      var im = document.createElement("img");
      im.src = "ressource/img/general/mascotte.gif";
      im.id = "mascotte";
      cont.appendChild(im);

      var ps = document.createElement("div");
      ps.id = "pictos";
      cont.appendChild(ps);

      picto_ids = ["home", "text_clue", "replay", "clue"];
      for (var i = 0; i<4; i++){
        var picto = document.createElement("img");
        picto.setAttribute("class", "picto");
        picto.id = picto_ids[i];
        ps.appendChild(picto);
      }

    init_game();

  }


}));
