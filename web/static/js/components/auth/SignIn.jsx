var React = require('react');
// var LinkedStateMixin = require('react-addons-linked-state-mixin');
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import actions from '../../actions/action';
import { connect } from 'react-redux';

var SignIn = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {email:"", password:""};
  },
  signIn:function(e){
    e.preventDefault();
    var request = new XMLHttpRequest();
    request.open("POST", this.props.url);
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    request.onload = function(){
      if(request.status === 201){
        let session = JSON.parse(request.responseText)
        // this.props.onSignIn(user);
        this.props.dispatch( actions.addSession( session ) );

      }else if(request.status === 401){
      }
    }.bind(this)
    var data = {
      session:{
        email:this.state.email,
        password:this.state.password
      }
    }
    request.send(JSON.stringify(data));
  },
  render: function() {
    return (
      <form onSubmit={this.signIn}>
        <input type="text" valueLink={this.linkState('email')} placeholder="Email" />
        <input type="password" valueLink={this.linkState('password')} placeholder="Password" />
        <button onClick={this.signIn}> Sign In </button>
      </form>
    );
  }
});

// module.exports = SignIn;

const mapStateToProps = ( state ) => {
  return state
}

export default connect( mapStateToProps )( SignIn );
