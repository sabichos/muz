import React, { Component, Fragment } from 'react';
import { withMachine } from 'yotam-state-machine';
import usersStateDefinition from '../../stateDefinitions/usersStateDefinition';
import { getUsers } from '../../services/apiServices';
import { notify } from '../../services/socketService';
import { beautifyfileName } from '../../services/filesService';
import PropTypes from 'prop-types';
import './Users.css';

class Users extends Component {

  componentDidMount() {
    this.props.onGetUsers();
  }

  notifyTrack() {
    notify({ username: this.props.username, track: beautifyfileName(this.props.track.name) });
  }

  renderLoading() {
    if (this.props.stateName !== "fetching") return null;
    return <p>fetching users, please wait...</p>
  }
  renderUserDetails() {
    if (!this.props.username) return null;
    return <div className="user-details">
      <img className="user-avatar" src={`${window.settings.api}/api/user/${this.props.username}/avatar`} alt="user avatar" />
      {this.props.track &&
        <button className="btn btn-share block-span f5 bg-accent-2 color-white" onClick={() => this.notifyTrack()}>♪ Share this track</button>
      }
    </div>
  }
  renderUsersList() {
    if (this.props.data && this.props.data.users) {
      let userList = this.props.data.users.map((user, index) =>
        <li key={index}>
          <img className="avatar" src={`${window.settings.api}/api/user/${user.username}/avatar`} alt={user.name} />
          <span className="f6">{user.name}</span>
        </li>)
      return <ul className="userlist">{[...userList]}</ul>
    }

    return null;

  }
  renderError() {
    if (this.props.stateName !== "error") return null;
    return <Fragment>
      <span className="block-span f3">☹</span>
      <span className="block-span f5">Users refused to come down from the server</span>
      <button className="btn btn-retry f5 block-span bg-accent-3 color-white" onClick={() => this.props.onError()}>ask them again</button>
    </Fragment>
  }

  render() {
    return (
      <div className="users bg-medium" >
        {this.renderUserDetails()}
        {this.renderLoading()}
        {this.renderError()}
        {this.renderUsersList()}
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
      dispatch("getUsers");
      getUsers()
        .then(response => {
          dispatch("success", { users: response.data });
        })
        .catch(error => dispatch("failure", { error }))
    }
  }
}

const ConnectedUsers = withMachine("idle", usersStateDefinition, mapDispatchToProps)(Users);
export default ConnectedUsers;

