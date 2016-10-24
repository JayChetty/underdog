import React from 'react'
import {Socket} from "phoenix"
import { connect } from 'react-redux';
import actions from "../../actions/actions";

export class GroupChat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      msg:''
    };
  }

  componentDidMount(e){
    let channel = this.props.group.channel
    channel.on("new_msg", payload => {
      // const newMsgs = this.state.msgs.concat( [ payload ] )
      console.log('payload', payload)
      this.props.dispatch( actions.addGroupMessage( payload ) )

      // this.setState({ msgs:  payload.body })
    })
  }

  updateMsg(e) {
    this.setState( { msg: e.target.value } )
  }

  sendMsg( e ) {
    e.preventDefault();
    this.props.group.channel.push("new_msg", {body: this.state.msg, group_id: this.props.group.id })
  }

  render() {
    console.log('rendering props', this.props)
    const messages = this.props.group.messages.map( (msg, index) => {
      return(
        <div key={ index }>{msg.body}</div>
      )

    })
    return(
     <div>
        {messages}
        <footer className="layout-footer">
        <form onSubmit={ this.sendMsg.bind(this) }>
          <input type="text" onChange={ this.updateMsg.bind(this) }></input>
          <input type="submit" value="send" />
        </form>
        </footer>
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
