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

