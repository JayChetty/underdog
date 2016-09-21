import React from 'react';
import {connect} from 'react-redux';
import {push} from 'redux-router';


function requireAuth( Component ) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth( this.props.isAuthenticated );
    }

    componentWillReceiveProps( nextProps ) {
      this.checkAuth( nextProps.isAuthenticated )
    }

    checkAuth( isAuthenticated ) {
      if (!isAuthenticated) {
        this.props.dispatch(pushState(null, `/login`));
      }
    }

    render() {
      return (
        <div>
          { this.props.isAuthenticated ? <Component {...this.props}/> : null }
        </div>
      )
    }

  }

  const mapStateToProps = (state) => ({
      token: state.session.token,
      isAuthenticated: state.session.isAuthenticated
  });

  return connect(mapStateToProps)(AuthenticatedComponent);

}

export default requireAuth;
