import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { beautifyfileName } from '../../services/filesService';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = { trackFile: null }
  }

  componentDidUpdate() {
    const reader = new FileReader();
    var self = this;
    reader.onload = function (e) {
      self.setState({ trackFile: e.target.result })
    }
    reader.readAsDataURL(this.props.track);
  }




  render() {
    return (
      <div className="color-white">
        {
          this.props.track &&
          <Fragment>
            <div className="visualizer"></div>
            <h2 className="f2l">{beautifyfileName(this.props.track.name)}</h2>
            <audio src={this.state.trackFile} controls autoPlay></audio>
          </Fragment>
        }
      </div>
    );
  }
}

Player.prototypes = {
  track: PropTypes.object
}

export default Player;
