import {Socket} from "phoenix"

export function connectToSocket(token){
  let socket = new Socket("/socket", {params: {guardian_token: token}})
  socket.connect()
  return socket
}

export function joinChannel(socket, channelTopicKey){
  let channel = socket.channel(channelTopicKey, {})
  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })
  return channel
}
