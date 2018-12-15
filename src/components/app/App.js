import React, { Component } from 'react';
import { getFromQueryString, getUser } from '../../services/apiServices';
import './App.css';
import Header from '../header/Header';
import Player from '../player/Player';
import TrackList from '../trackList/TrackList';
import Users from '../users/Users';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { track: null, username: null }
  }


  componentDidMount() {
    let username = getFromQueryString("user");
    this.setState({ username: username })
  }

  selectTrack(track, index) {
    this.setState({ track: track, index: index });
  }

  render() {
    return (
      <div className="app bg-dark color-white">
        <Header />
        <section className="body">
          <Users username={this.state.user} />
          <Player track={this.state.track} />
          <TrackList onSelectTrack={(track, index) => this.selectTrack(track, index)} selected={this.state.index} />
        </section>
      </div>
    );
  }
}
export default App;
