import LinkedStateMixin from 'react-addons-linked-state-mixin';
import React from 'react';
import reactMixin from 'react-mixin';
import actions from '../../actions/actions';
import { connect } from 'react-redux';

export class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  signIn(e) {
    e.preventDefault();
    actions.loginUser( this.state.email, this.state.password )( this.props.dispatch );
  }

  render() {
    return (
      <div className="layout-flex layout-flex-center layout-full-height layout-color-blue">
        <div className="layout-constrained">
          <div className="navbar-header text-large text-white text-center">UNDER<span className="text-bold">DOG</span></div>
          <form className="stacked-form">
            <input className="stacked-form-input" type="text" valueLink={this.linkState('email')} placeholder="Email" />
            <input className="stacked-form-input" type="password" valueLink={this.linkState('password')} placeholder="Password" />
            <button className="button button-submit button-full-width" onClick={this.signIn.bind( this )}> Sign In </button>
          </form>
        </div>
      </div>
    );
  }

};

reactMixin(SignIn.prototype, LinkedStateMixin);

const mapStateToProps = ( state ) => {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect( mapStateToProps, mapDispatchToProps )( SignIn );
