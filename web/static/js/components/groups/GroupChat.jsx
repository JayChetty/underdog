import React from 'react'
import {Socket} from "phoenix"

export class GroupChat extends React.Component {

  constructor(props) {
    console.log('props', props)
    super(props);
    this.state = {
      msg:''
    };
  }

  componentDidMount(e){
    let channel = this.props.route.channel
    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })

    console.log('channel', channel)
    channel.push("new_msg", {body: "MESSAGE COMING FROM COMPONMOUNT"})

    channel.on("new_msg", payload => {
      // let messageItem = document.createElement("li");
      // messageItem.innerText = `[${Date()}] ${payload.body}`
      // messagesContainer.appendChild(messageItem)
      console.log("CLIENT got message", payload)
    })
  }

  updateMsg(e) {
    this.setState( { msg: e.target.value } )
  }

  sendMsg( e ) {
    console.log( this.state )
    this.props.route.channel.push("new_msg", {body: this.state.msg})
  }

  render() {
    // console.log('props', this.props)
    return(
     <div>
        <input type="text" onChange={ this.updateMsg.bind(this) }></input>
        <button onClick={ this.sendMsg.bind(this) }>Send</button>
     </div>
    )
  }

}





export default GroupChat
