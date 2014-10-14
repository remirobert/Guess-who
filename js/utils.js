function loadJSON(path)
{
    var request = new XMLHttpRequest();
    request.open('GET', path, false);
    request.send(null);
    if (request.status == 200)
        return JSON.parse(request.responseText);
    return null;
}

function log(params){
  if(params instanceof Array){
    for (var i=0;i<params.length;i++){
        console.log(params[i]);
      }
  }else{
    console.log(params)
  }
}
<<<<<<< HEAD

function getJSON(file){
  var request = new XMLHttpRequest();
  var filepath = 'ressource/json/'+file;
  request.open("GET", filepath, false);
  request.send(null);
  var my_JSON_object = JSON.parse(request.responseText);
  alert(my_JSON_object.result[0]);
}
=======
>>>>>>> bcd920850f6b1b062d0ee134ff64a17cd1422580
