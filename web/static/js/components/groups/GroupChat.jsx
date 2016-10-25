import React from 'react'
import ReactDOM from 'react-dom';
import {Socket} from "phoenix"
import { connect } from 'react-redux';
import actions from "../../actions/actions";
import moment from "moment";


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

    this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
  }

  componentDidUpdate() {
    this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
  }

  updateMsg(e) {
    this.setState( { msg: e.target.value } )
  }

  sendMsg( e ) {
    e.preventDefault();
    this.props.group.channel.push("new_msg", {body: this.state.msg, group_id: this.props.group.id })
    this.setState( { msg: '' } )
  }

  render() {
    console.log('rendering props', this.props)
    const messages = this.props.group.messages.map( (msg, index) => {
      const user = this.props.group.users.find( user => user.id === msg.user_id )

      let containerClasses = []
      let elementClasses = ["speech_bubble"]
      let userName = null;
      if(user.id === this.props.current_user.id){
        // containerClasses.push( "" )
        elementClasses.push( "bg-blue layout-flex-self-end" )
      }else{
        userName = user.email
        elementClasses.push( "layout-flex-self-start" )

      }

      return(
        <div className={ elementClasses.join(" ") }>
          <div className="text-bold text-blue">{userName}</div>
          {msg.body}
          <div className="text-right">{ moment( msg.updated_at ).format( "HH:MM" ) }</div>
        </div>
      )

    })
    return(
     <div className='layout-full-height layout-flex layout-flex-direction-column layout-justify-flex-space-between'>
        <div
          ref={(div) => this.messagesDiv = div}
          className="scroll-y layout-flex layout-flex-direction-column">
          {messages}
        </div>
        <footer className="layout-footer">
          <form onSubmit={ this.sendMsg.bind(this) }>
            <input type="text" value={this.state.msg} onChange={ this.updateMsg.bind(this) }></input>
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
    group: group,
    current_user: state.session.user
  }
}


export default connect( mapStateToProps )( GroupChat )
