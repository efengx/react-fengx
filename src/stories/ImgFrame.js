import React, { Component } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import ImgBlock from './ImgBlock';
import Slider from './slider';

import lib from '../data/images';

const Wrapper = styled.div`
  font-size: 1rem;

  > #content {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

class ImgFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 15,
      cssOpacity: '.3',
      lib: lib,
      startX: 0,
      startY: 0,
      endX: -400,
      endY: 0,
      startScaleX: 1,
      startScaleY: 1,
      endScaleX: 1,
      endScaleY: 1,
      showFooter: 'block'
    };
  }

  follow = deltaY => {
    if (this.state.currentId) {
      const currentArr = String(this.state.currentId).split('');
      const endY = -(currentArr[0] - 1) * 100;
      this.setState({
        endY: endY - deltaY
      });
    }
  };

  slide = deltaY => {
    if (this.state.currentId) {
      let id = this.state.currentId;
      if (Math.abs(deltaY) === 100) {
        let path = 'down';
        if (deltaY > 0) {
          path = 'up';
        }
        id = this.nextId(this.state.currentId, path);
      }

      if (id > 0) {
        const currentArr = String(id).split('');
        this.setState({
          currentId: id,
          endX: -(currentArr[1] - 1) * 100,
          endY: -(currentArr[0] - 1) * 100
        });
      } else if (id === 0) {
        // end page
        this.setState({
          currentId: id,
          endX: -40,
          endY: -40,
          endScaleX: 0.1,
          endScaleY: 0.1,
          showFooter: 'none'
        });
      }
    } else if (this.state.currentId === 0) {
      this.setState({
        currentId: 15,
        endX: -400,
        endY: 0,
        startScaleX: 0.1,
        startScaleY: 0.1,
        endScaleX: 1,
        endScaleY: 1,
        showFooter: 'block'
      });
    }
  };

  nextId = (id, path) => {
    const currentArr = String(id).split('');
    currentArr[0] = parseInt(currentArr[0], 10);
    currentArr[1] = parseInt(currentArr[1], 10);
    if (path === 'up') {
      if (currentArr[1] < 9) {
        currentArr[1] += 1;
      } else if (currentArr[0] < 9) {
        currentArr[0] += 1;
        currentArr[1] = 1;
      } else {
        return 0;
      }
    } else {
      if (currentArr[1] > 1) {
        currentArr[1] -= 1;
      } else if (currentArr[0] > 1) {
        currentArr[0] -= 1;
        currentArr[1] = 9;
      } else {
        return -1;
      }
    }

    const cell = this.state.lib[currentArr[0] - 1].row[currentArr[1] - 1];
    if (cell.show === 'block') {
      return cell.id;
    }
    return this.nextId(cell.id, path);
  };

  onSelectId = id => {
    if (this.state.currentId !== id) {
      const currentArr = String(id).split('');

      this.setState({
        currentId: id,
        startX: this.state.endX,
        startY: this.state.endY,
        endX: -(currentArr[1] - 1) * 100,
        endY: -(currentArr[0] - 1) * 100
      });
    }
  };

  render() {
    return (
      <Wrapper>
        <ImgBlock
          data={this.state.lib}
          startX={this.state.startX}
          startY={this.state.startY}
          endX={this.state.endX}
          endY={this.state.endY}
          startScaleX={this.state.startScaleX}
          startScaleY={this.state.startScaleY}
          endScaleX={this.state.endScaleX}
          endScaleY={this.state.endScaleY}
        />
        <Footer
          showFooter={this.state.showFooter}
          currentId={this.state.currentId}
          data={this.state.lib}
          cssOpacity={this.state.cssOpacity}
          onClickFun={this.onSelectId}
        />
        <Slider onSlide={this.slide} onFollow={this.follow} />
      </Wrapper>
    );
  }
}

export default ImgFrame;
