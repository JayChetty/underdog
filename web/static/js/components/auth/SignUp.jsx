import LinkedStateMixin from 'react-addons-linked-state-mixin';
import React from "react";
import actions from '../../actions/actions';
import { connect } from 'react-redux';

export class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  signUp(e) {
    e.preventDefault();
    actions.signUpUser( this.state.name, this.state.email, this.state.password )( this.props.dispatch );
  }

  render() {

    const handleNameChange = (e) => {
      const state = this.setState( { name: e.target.value } )
    }

    const handleEmailChange = (e) => {
      const state = this.setState( { email: e.target.value } )
    }

    const handlePasswordChange = (e) => {
      const state = this.setState( { password: e.target.value } )
    }

    return(
      <div className="layout-flex layout-flex-center layout-full-height layout-color-blue">
        <div className="layout-constrained">
          <div className="navbar-header text-large text-white text-center">UNDER<span className="text-bold">DOG</span></div>
          <form className="stacked-form">
            <input className="stacked-form-input" type="text" placeholder="Name" onChange={ handleNameChange } />
            <input className="stacked-form-input" type="text" placeholder="Email" onChange={ handleEmailChange } />
            <input className="stacked-form-input" type="password"  placeholder="Password" onChange={ handlePasswordChange } />
            <button className="button button-submit button-full-width" onClick={ this.signUp.bind( this ) }>Sign Up</button>
          </form>
        </div>
      </div>
    )

  }

}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect( mapDispatchToProps )( SignUp );

// export default SignUp;
