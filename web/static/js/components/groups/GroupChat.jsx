import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import actions from "../../actions/actions";
import moment from "moment";
import GroupOptions from "./GroupOptions"

export class GroupChat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      msg:''
    };
  }

  componentDidMount(e){
    setTimeout(()=>{ document.body.scrollTop = document.body.scrollHeight }, 100);
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

    const messages = this.props.group.messages.map( (msg, index) => {
      const user = this.props.group.users.find( user => user.id === msg.user_id )

      let containerClasses = []
      let elementClasses = ["speech-bubble"]
      let userName = null;
      if(user.id === this.props.current_user.id){
        // containerClasses.push( "" )
        elementClasses.push( "bg-blue layout-flex-self-end" )
      }else{
        userName = user.name || user.email
        elementClasses.push( "layout-flex-self-start" )

      }

      return(
        <div key={index} className={ elementClasses.join(" ") }>
          <div className="text-skinny text-blue">{userName}</div>
          {msg.body}
          <div className="text-right text-x-small">{ moment( msg.updated_at ).format( "HH:MM" ) }</div>
        </div>
      )

    })
    return(
     <div className='layout-full-height layout-flex layout-flex-direction-column layout-justify-flex-space-between'>
        <div
          ref={(div) => this.messagesDiv = div}
          className="layout-flex layout-flex-direction-column">
          {messages}
        </div>
        <footer className="layout-footer bg-gray">
          <form className="layout-flex layout-full-height" onSubmit={ this.sendMsg.bind(this) }>
            <input className="layout-flex-grow-10 form-text-input" type="text" value={this.state.msg} onChange={ this.updateMsg.bind(this) }></input>
            <button className="layout-flex-grow-2 button bg-blue" type="submit">
              <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
            </button>
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
