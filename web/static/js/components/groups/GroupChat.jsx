import React from 'react'
import {Socket} from "phoenix"

export class GroupChat extends React.Component {

  constructor(props) {
    console.log('props', props)
    super(props);
    this.state = {
      msg:'',
      msgs:[]
    };
  }

  componentDidMount(e){
    let channel = this.props.route.channel
    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })

    channel.on("new_msg", payload => {
      const newMsgs = this.state.msgs.concat( [ payload ] )
      console.log( newMsgs)

      this.setState({ msgs: newMsgs })
      // let messageItem = document.createElement("li");
      // messageItem.innerText = `[${Date()}] ${payload.body}`
      // messagesContainer.appendChild(messageItem)
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
    const messages = this.state.msgs.map( (msg) => {
      return(
        <div>{msg.body}</div>
      )

    })
    return(
     <div>
        <input type="text" onChange={ this.updateMsg.bind(this) }></input>
        <button onClick={ this.sendMsg.bind(this) }>Send</button>
        {messages}
     </div>
    )
  }

}





export default GroupChat
