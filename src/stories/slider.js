import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: none;
`;

class Slider extends Component {
  constructor(props) {
    super(props);
    this.eventBind();
  }

  defalutState = {
    prevY: 0,
    deltaY: 0,
    isStart: false,
    isPage: false
  };

  eventBind() {
    // Phone
    document.body.addEventListener('touchstart', this.onTouchstart);
    document.body.addEventListener('touchmove', this.onTouchmove, {
      passive: false,
      useCapture: false
    });
    document.body.addEventListener('touchend', this.onTouchend);
    // FireFox
    // document.body.addEventListener('DOMMouseScroll', onMousewheel);
    // Chrome IE10 IE7
    // document.body.addEventListener('mousewheel', onMousewheel);
    document.body.addEventListener('mousedown', this.onTouchstart);
    document.body.addEventListener('mousemove', this.onTouchmove);
    document.body.addEventListener('mouseup', this.onTouchend);
    // document.getElementById('content').addEventListener('mousedown', onTouchstart);
    // document.getElementById('content').addEventListener('mousemove', onTouchstart);
    // document.getElementById('content').addEventListener('mouseup', onTouchstart);
  }

  // Phone
  onTouchstart = e => {
    this.defalutState.prevY = e.pageY;
    this.defalutState.isStart = true;
    // this.setState({
    //   prevY: e.pageY,
    //   isStart: true
    // });
  };

  onTouchmove = e => {
    e.preventDefault();
    if (this.defalutState.isStart) {
      let deltaY = this.defalutState.prevY - e.pageY;
      let isPage = false;
      if (deltaY !== 0) {
        if (Math.abs(deltaY) > 100) {
          if (deltaY > 0) {
            deltaY = 100;
          } else {
            deltaY = -100;
          }
          isPage = true;
        }
      }

      this.defalutState.deltaY = deltaY;
      this.defalutState.isPage = isPage;
      this.props.onFollow(this.defalutState.deltaY);
    }
  };

  onTouchend = () => {
    this.defalutState.prevY = -1;
    this.defalutState.isStart = false;
    this.defalutState.isPage = false;
    this.props.onSlide(this.defalutState.deltaY);
  };

  refresh(onSlide, onFollow) {
    if (this.defalutState.prevY === -1) {
      onSlide(this.defalutState.prevY);
    } else if (this.defalutState.isStart) {
      onFollow(this.defalutState.prevY);
    }
    console.log(this.defalutState);
  }

  render() {
    return <Wrapper />;
  }
}

export default Slider;
