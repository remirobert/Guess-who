function log(params){
  if(params instanceof Array){
    for (var i=0;i<params.length;i++){
        console.log(params[i]);
      }
  }else{
    console.log(params)
  }
}

function getJSON(file){
  var request = new XMLHttpRequest();
  var filepath = 'ressource/json/'+file;
  request.open("GET", filepath, false);
  request.send(null);
  var my_JSON_object = JSON.parse(request.responseText);
  alert(my_JSON_object.result[0]);
}