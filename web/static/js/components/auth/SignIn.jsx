// import { Component } from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import React from 'react';
import reactMixin from 'react-mixin';
import actions from '../../actions/actions';
import { connect } from 'react-redux';

export class SignIn extends React.Component {

  constructor(props) {
    super(props);
    // const redirectRoute = this.props.location.query.next || '/login';
    this.state = {
      email: '',
      password: ''
    };
  }

  // mixins: [LinkedStateMixin],

  // getInitialState: function(){
  //   return {email:"", password:""};
  // },

  // signIn:function(e){
  //   e.preventDefault();
  //   var request = new XMLHttpRequest();
  //   request.open("POST", "/api/sessions");
  //   request.setRequestHeader("Content-Type", "application/json");
  //   request.withCredentials = true;
  //   request.onload = function(){
  //     if(request.status === 201){
  //       let session = JSON.parse(request.responseText)
  //       console.log("signed in go", request.responseText)
  //       localStorage.setItem('ud_session', request.responseText);
  //       this.props.dispatch( actions.addSession( session ) );
  //       // this.props.onSignIn(user);
  //
  //     }else if(request.status === 401){
  //     }
  //   }.bind(this)
  //   var data = {
  //     session:{
  //       email:this.state.email,
  //       password:this.state.password
  //     }
  //   }
  //   request.send(JSON.stringify(data));
  // }

  signIn(e) {
    e.preventDefault();
    actions.loginUser( this.state.email, this.state.password )( this.props.dispatch );
  }

  render() {
    return (
      <div className="layout-flex layout-full-height layout-color-green">
        <div className="layout-constrained">
          <nav className="layout-navbar">
            <div className="navbar-header text-large text-white">UNDER<span className="text-bold">GOD</span></div>
          </nav>
          <form className="stacked-form">
            <input className="stacked-form-input" type="text" valueLink={this.linkState('email')} placeholder="Email" />
            <input className="stacked-form-input" type="password" valueLink={this.linkState('password')} placeholder="Password" />
            <button className="button button-submit button-full-width" onClick={this.signIn.bind(this)}> Sign In </button>
          </form>
        </div>
      </div>
    );
  }

};


// reactMixin(SignIn.prototype, React.addons.LinkedStateMixin);
reactMixin(SignIn.prototype, LinkedStateMixin);

const mapStateToProps = ( state ) => {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  dispatch : dispatch
});

export default connect( mapStateToProps, mapDispatchToProps )( SignIn );
