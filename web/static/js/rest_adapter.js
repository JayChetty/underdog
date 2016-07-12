export function get(url, callback, session){
  var request = new XMLHttpRequest();
  request.open( "GET", url );
  if(session){
    request.setRequestHeader("Authorization", session.jwt);
  }
  request.onload = () => {
    if( request.status === 200 ) {
      let receivedJson = JSON.parse( request.responseText )
      callback( receivedJson.data )
    }
  }
  request.send( null );
}


export function post(url, callback, session, data){
  var request = new XMLHttpRequest();
  request.open("POST", url );
  request.setRequestHeader("Content-Type", "application/json");
  if(session){
    request.setRequestHeader("Authorization", session.jwt);
  }
  request.onload = () => {
    if( request.status === 200 ) {
      let receivedJson = JSON.parse( request.responseText )
      if(callback){
        callback( receivedJson.data )
      }
    }
  }
  request.send( data );
}

export function deleter(url, callback, session){
  var request = new XMLHttpRequest();
  request.open("DELETE", url );
  request.setRequestHeader("Content-Type", "application/json");
  if(session){
    request.setRequestHeader("Authorization", session.jwt);
  }
  request.onload = () => {
    if( request.status === 200 ) {
      let receivedJson = JSON.parse( request.responseText )
      if(callback){
        callback( receivedJson.data )
      }
    }
  }
  request.send();
}
