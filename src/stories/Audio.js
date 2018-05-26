import React, { Component } from 'react';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';
import saveme from '../assect/saveme.mp3';

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
  render() {
    const { loop, autoPlay } = this.props;

    return (
      <Wrapper>
        <Img />
        <ReactAudioPlayer src={saveme} loop={loop} autoPlay={autoPlay} />
      </Wrapper>
    );
  }
}

export default Audio;
