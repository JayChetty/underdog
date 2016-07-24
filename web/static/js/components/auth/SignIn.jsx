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
        console.log("signed in go", request.responseText)
        localStorage.setItem('ud_session', request.responseText);
        this.props.dispatch( actions.addSession( session ) );
        // this.props.onSignIn(user);

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
      <div className="layout-flex layout-full-height layout-color-green">
        <div className="layout-constrained">
          <nav className="layout-navbar">
            <div className="navbar-header text-large text-white delay-slide-in-bottom">UNDER<span className="text-bold">GOD</span></div>
          </nav>
          <form className="stacked-form delay-fade-in" onSubmit={this.signIn}>
            <input className="stacked-form-input" type="text" valueLink={this.linkState('email')} placeholder="Email" />
            <input className="stacked-form-input" type="password" valueLink={this.linkState('password')} placeholder="Password" />
            <button className="button button-submit button-full-width" onClick={this.signIn}> Sign In </button>
          </form>
        </div>
      </div>
    );
  }
});

const mapStateToProps = ( state ) => {
  return state
}

export default connect( mapStateToProps )( SignIn );
