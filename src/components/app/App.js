import React, { Component } from 'react';
import './App.css';
import Header from '../header/Header';
import Player from '../player/Player';
import TrackList from '../trackList/TrackList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTrack: null }
  }

  selectTrack(track) {
    this.setState({ track: track });
  }

  render() {
    return (
      <div className="app bg-dark color-white">
        <Header />
        <section className="body">
          <Player track={this.state.track} />
          <TrackList onSelectTrack={track => this.selectTrack(track)} />
        </section>
      </div>
    );
  }
}

export default App;
