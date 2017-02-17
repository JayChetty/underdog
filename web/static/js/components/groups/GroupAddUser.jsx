import React from 'react'
import { connect } from 'react-redux';
import actions from '../../actions/actions'
import {Link} from 'react-router';

export class GroupAddUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  addMember(e) {
    e.preventDefault();
    this.props.group.channel.push("add_member", {email: this.state.email, group_id: this.props.group.id })
  }

  render() {


    const handleEmailChange = (e) => {
      const state = this.setState( { email: e.target.value } )
    }



    return(
        <form className="stacked-form">
          <input className="stacked-form-input" type="text" placeholder="Email" onChange={ handleEmailChange } />
          <button className="button button-submit" onClick={ this.addMember.bind( this ) }>Add Member</button>
        </form>
    )

  }

}

const mapStateToProps = (state, { params, route } )=>{
  const group = state.groups.items.find((group)=>{
    return group.id === Number(params.groupId)
  })
  return {
    group: group,
  }
}


export default connect( mapStateToProps )( GroupAddUser )
