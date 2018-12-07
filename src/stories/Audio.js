import React, { Component } from 'react';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';

import musicImg from '../data/images/music.png';
import muteImg from '../data/images/mute.png';
import music from '../assect/saveme.mp3';

const Wrapper = styled.div`
  background-image: url(${props => props.img}});
  position: absolute;
  z-index: 99;
  top: 10px;
  left: 10px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 99;
`;

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgPath: musicImg,
      isOpen: true
    };
  }

  defaultState = {
    rap: null
    // src: music
  };

  handleClick = () => {
    if (this.defaultState.rap) {
      if (this.state.isOpen) {
        this.defaultState.rap.audioEl.pause();
        this.setState({
          imgPath: muteImg,
          isOpen: !this.state.isOpen
        });
      } else {
        this.defaultState.rap.audioEl.play();
        this.setState({
          imgPath: musicImg,
          isOpen: !this.state.isOpen
        });
      }
    }
  };

  render() {
    const { loop, autoPlay } = this.props;

    return (
      <Wrapper>
        <Img src={this.state.imgPath} onClick={() => this.handleClick()} />
        <ReactAudioPlayer
          ref={element => (this.defaultState.rap = element)}
          src={music}
          loop={loop}
          autoPlay={autoPlay}
        />
      </Wrapper>
    );
  }
}

export default Audio;
