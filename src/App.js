import React, { Component } from 'react';
import styled from 'styled-components';
import ImgFrame from './stories/ImgFrame';
const Wrapper = styled.div``;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <ImgFrame />
      </Wrapper>
    );
  }
}

export default App;
