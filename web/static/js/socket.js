import {Socket} from "phoenix"

let host = ''
if(window.isCordovaApp){
  // host = "ws://localhost:4000"
  // host = "ws://guarded-hollows-82324.herokuapp.com"
  host = "wss://guarded-hollows-82324.herokuapp.com"
}

export function connectToSocket(token){
  let socket = new Socket(`${host}/socket`, {params: {guardian_token: token}})
  console.log("connecting to socket", socket)
  socket.connect()
  console.log("connectED to socket", socket)
  return socket
}

export function joinChannel(socket, channelTopicKey){
  let channel = socket.channel(channelTopicKey, {})
  console.log("Trying to join channel", socket, channelTopicKey)
  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })
  return channel
}
