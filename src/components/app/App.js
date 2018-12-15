import React, { Component } from 'react';
import { getFromQueryString } from '../../services/apiServices';
import { subscribeToNitification } from '../../services/socketService';
import './App.css';
import Header from '../header/Header';
import Player from '../player/Player';
import TrackList from '../trackList/TrackList';
import Users from '../users/Users';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { track: null, notifications: [] }
  }



  componentDidMount() {
    let username = getFromQueryString("user");
    this.setState({ username: username })

    subscribeToNitification(notification => this.setState({ notifications: [...this.state.notifications, notification.message] }));
  }

  selectTrack(track, index) {
    this.setState({ track: track, index: index });
  }

  
  render() {
    return (
      <div className="app bg-dark color-white">

        <section className="body">

          <div className="rhythm-section">
            <Header />
            <Player track={this.state.track} />
            <div className="notification-center marquee">
            <span>
              {this.state.notifications.map((message,index) => <span key={index} className="f6 color-accent-1">{message} &middot; </span>)}
              </span>
            </div>
            <TrackList onSelectTrack={(track, index) => this.selectTrack(track, index)} selected={this.state.index} />
          </div>
          <div className="users-section">
            <Users username={this.state.username} track={this.state.track} />
          </div>
        </section>
      </div>
    );
  }
}


export default App;
