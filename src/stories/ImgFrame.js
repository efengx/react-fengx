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
      endY: 0
    };
  }

  follow = deltaY => {
    const currentArr = String(this.state.currentId).split('');
    const endY = -(currentArr[0] - 1) * 100;
    this.setState({
      endY: endY - deltaY
    });
  };

  slide = deltaY => {
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
        return 0;
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
        />
        <Footer
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
