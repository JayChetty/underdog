import React, {PropTypes}   from 'react';
import { connect }          from 'react-redux';
// import { Link }             from 'react-router';

import Actions              from '../../actions/registrations';

class RegistrationsNew extends React.Component {


  _handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    const data = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value,
    };

    dispatch(Actions.signUp(data));
  }

  render() {
    return (
      <div className="view-container registrations new">
        <main>
          <header>
            <div className="logo" />
          </header>
          <form onSubmit={::this._handleSubmit}>
            <div className="field">
              <input ref="name" type="text" placeholder="First name" required={true} />
            </div>
            <div className="field">
              <input ref="email" type="email" placeholder="Email" required={true} />
            </div>
            <div className="field">
              <input ref="password" type="password" placeholder="Password" required={true} />
            </div>
            <div className="field">
              <input ref="passwordConfirmation" type="password" placeholder="Confirm password" required={true} />
            </div>
            <button type="submit">Sign up</button>
          </form>
          <Link to="/sign_in">Sign in</Link>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(RegistrationsNew);
