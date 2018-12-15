import React, { Component, Fragment } from 'react';
//import {withMachine} from 'yotam-state-machine';
//import usersStateDefinition from '../../stateDefinitions/usersStateDefinition';
import PropTypes from 'prop-types';
import './Users.css';

class Users extends Component {
  constructor(props) {
    super(props);
  }

  renderUserDetails() {
    if (!this.props.user) return null;
    return <Fragment>
      <img src={`${window.settings.api}/api/user/${this.props.username}/avatar`} alt="user avatar" />
    </Fragment>
  }
  render() {
    return (
      <div className="users" >
        {this.renderUserDetails()}


        <ul>

        </ul>
      </div>
    );
  }
}

Users.proptypes = {
  user: PropTypes.object
}



const mapDispatchToProps = dispatch => {
  return {
    onGetUsers: () => {
      dispatch("getUsers")
    },
    onError: () => dispatch("retry")
  }
}


//const ConnectedUsers = withMachine("idle", usersStateDefinition, mapDispatchToProps)(Users);
export default Users;

