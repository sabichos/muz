import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withMachine } from 'yotam-state-machine';
import playerStateDefinition from '../../stateDefinitions/playerStateDefinition';
import { beautifyfileName } from '../../services/filesService';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);
    this.playerRef = React.createRef();
    this.state = { trackFile: null }
  }

  componentDidUpdate() {
    const reader = new FileReader();
    var self = this;
    reader.onload = function (e) {
      self.setState({ trackFile: e.target.result })
    }
    reader.readAsDataURL(this.props.track);

    this.setAudioAction();
  }

  setAudioAction() {
    switch (this.props.stateName) {
      case "stopped":
        this.playerRef.current.pause();
        this.playerRef.current.currentTime = 0;
        break;
      case "started":
        this.playerRef.current.play();
        break;
      case "paused":
        this.playerRef.current.pause();
        break;
      default:
        break;
    }
  }

  renderButtons() {
    switch (this.props.stateName) {
      case "stopped":
        return <button className="btn btn-link color-accent-3 f2" onClick={() => this.props.onStart()}>&#9658;</button>
      case "started":
        return <Fragment>
          <button className="btn btn-link color-accent-3 f2" onClick={() => this.props.onStop()}>&#9724;</button>
          <button className="btn btn-link color-accent-3 f2" onClick={() => this.props.onPause()}>&#10074;&#10074;</button>
        </Fragment>
      case "paused":
        return <Fragment>
          <button className="btn btn-link color-accent-3 f2" onClick={() => this.props.onStart()}>&#9658;</button>
          <button className="btn btn-link color-accent-3 f2" onClick={() => this.props.onStop()}>&#9724;</button>
        </Fragment>
      default:
        return;
    }


  }
  render() {
    if (!this.props.track) return null;
    return (
      <div className="player color-white bg-black">
        <h2 className="f5">{beautifyfileName(this.props.track.name)}</h2>
        <audio ref={this.playerRef} src={this.state.trackFile} autoPlay></audio>
        <div className="buttons">{this.renderButtons()}</div>
        {this.props.stateName === "started" && 
        <Fragment>
          <div className="pulse1"></div>
          <div className="pulse2"></div>
          <div className="pulse3"></div>
        </Fragment>
        }
      </div>
    );
  }
}

Player.prototypes = {
  track: PropTypes.object
}



const mapDispatchToProps = dispatch => {
  return {
    onStop: () => dispatch("stop"),
    onStart: () => dispatch("start"),
    onPause: () => dispatch("pause")
  }
}


const ConnectedPlayer = withMachine("stopped", playerStateDefinition, mapDispatchToProps)(Player);
export default ConnectedPlayer;
