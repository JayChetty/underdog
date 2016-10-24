import React from 'react'
import {Socket} from "phoenix"
import { connect } from 'react-redux';

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
    let channel = this.props.group.channel
    channel.on("new_msg", payload => {
      const newMsgs = this.state.msgs.concat( [ payload ] )
      console.log( newMsgs)
      this.setState({ msgs: newMsgs })
    })
  }

  updateMsg(e) {
    this.setState( { msg: e.target.value } )
  }

  sendMsg( e ) {
    console.log( this.state )
    this.props.group.channel.push("new_msg", {body: this.state.msg})
  }

  render() {
    console.log('rendering state', this.state)
    const messages = this.state.msgs.map( (msg, index) => {
      return(
        <div key={ index }>{msg.body}</div>
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



const mapStateToProps = (state, { params, route } )=>{
  const group = state.groups.items.find((group)=>{
    return group.id === Number(params.groupId)
  })
  return {
    group: group
  }
}


export default connect( mapStateToProps )( GroupChat )
