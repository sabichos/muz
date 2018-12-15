import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TrackList.css';
import { getDroppedFiles, removeDragData, beautifyfileName } from '../../services/filesService';

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [] };
  }

  addTracks(e) {
    e.preventDefault();
    let files = getDroppedFiles(e);
    this.setState({ tracks: [...this.state.tracks, ...files] });
    removeDragData(e);
  }


  render() {
    return (
      <div className="track-list" onDrop={(e) => this.addTracks(e)} onDragOver={(e) => e.preventDefault()}>
        {
          (!this.state.tracks || this.state.tracks.length === 0) &&
          <h2 className="empty-message f3">nothing to play, drag some files and start listening</h2>
        }
        <ol className="tracks" type="1">
          {
            this.state.tracks.map((track, index) => <li key={index} className="track f3">
              {this.props.selected === index && <i className="color-accent-3  ">&#9658;</i>}
              <button className="btn btn-link f3 color-light" onClick={() => this.props.onSelectTrack(track, index)}>
                {beautifyfileName(track.name)}
              </button>
            </li>)
          }
        </ol>
      </div>
    );
  }
}

TrackList.proptypes = {
  onSelectTrack: PropTypes.func
}
export default TrackList;
