import React, { Component } from 'react';
import styled from 'styled-components';
import Audio from './Audio';
import Canvas from './Canvas';

const Wrapper = styled.div`
  display: ${props => props.showFooter}
  position: absolute;
  z-index: 1000;
  bottom: 3rem;
  right: 2rem;
  transition: all 0.5s cubic-bezier(0.77, 0.1, 0.22, 1);
`;

class Footer extends Component {
  audioProps = {
    loop: true,
    autoPlay: true,
    status: true
  };

  render() {
    const { showFooter, data, currentId, cssOpacity, onClickFun } = this.props;

    return (
      <Wrapper showFooter={showFooter}>
        <Audio
          loop={this.audioProps.loop}
          autoPlay={this.audioProps.autoPlay}
        />
        <Canvas
          cssOpacity={cssOpacity}
          data={data}
          currentId={currentId}
          onClickFun={onClickFun}
        />
      </Wrapper>
    );
  }
}

export default Footer;
