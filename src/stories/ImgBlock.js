import React, { Component } from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  background-color: #fed1ea;
`;

const ImgWall = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translate(${props => props.x}%, ${props => props.y}%)
    scale(${props => props.sx}, ${props => props.sy});
  // transform-origin: 0 0;
`;

const Row = styled.div`
  display: inline-flex;
  vertical-align: top;
  white-space: normal;
  width: 900%;
  height: 100%;
  position: relative;
`;

const Cell = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
`;

const BackImg = styled.img`
  position: absolute;
  height: 100%;
`;

const PageContent = styled.div`
  position: absolute;
`;

const Title = styled.div`
  font-size: 3em;
`;

const Description = styled.div`
  color: #6e2d52;
  margin-top: 1.5em;
  font-size: 1.2em;
`;

class ImgBlock extends Component {
  showCell(item) {
    if (item.show === 'block') {
      return (
        <Cell key={item.id} style={item.cell}>
          {this.showContent(item)}
          {this.showImage(item)}
        </Cell>
      );
    }
    return (
      <Cell key={item.id}>
        <PageContent />
      </Cell>
    );
  }

  showContent(item) {
    if (item.content && item.description) {
      return (
        <PageContent style={item.con}>
          <div>
            <Title>{item.content}</Title>
            <Description>{item.description}</Description>
          </div>
        </PageContent>
      );
    } else if (item.content) {
      return <PageContent style={item.con}>{item.content}</PageContent>;
    } else if (item.list && item.description) {
      return (
        <PageContent style={item.con}>
          <div>
            {item.list.map(thing => {
              if (thing.style) {
                return (
                  <div key={thing.id} style={thing.style}>
                    {thing.content}
                  </div>
                );
              }
              return <div key={thing.id}>{thing.content}</div>;
            })}
          </div>
          <Description>{item.description}</Description>
        </PageContent>
      );
    } else if (item.list) {
      return (
        <PageContent style={item.con}>
          <div>
            {item.list.map(thing => {
              if (thing.style) {
                return (
                  <div key={thing.id} style={thing.style}>
                    {thing.content}
                  </div>
                );
              }
              return <div key={thing.id}>{thing.content}</div>;
            })}
          </div>
        </PageContent>
      );
    }
  }

  showImage(item) {
    if (item.img2) {
      return (
        <div>
          <BackImg src={item.img} style={item.image} />
          <BackImg src={item.img2} style={item.image2} />
        </div>
      );
    }
    return <BackImg src={item.img} style={item.image} />;
  }

  render() {
    const {
      data,
      startX,
      startY,
      endX,
      endY,
      startScaleX,
      startScaleY,
      endScaleX,
      endScaleY
    } = this.props;

    return (
      <Wrapper>
        <Motion
          defaultStyle={{
            x: startX,
            y: startY,
            sx: startScaleX,
            sy: startScaleY
          }}
          style={{
            x: spring(endX),
            y: spring(endY),
            sx: spring(endScaleX),
            sy: spring(endScaleY)
          }}
        >
          {style => (
            <ImgWall x={style.x} y={style.y} sx={style.sx} sy={style.sy}>
              {data.map(items => (
                <Row key={items.row_id}>
                  {items.row.map(item => {
                    return this.showCell(item);
                  })}
                </Row>
              ))}
            </ImgWall>
          )}
        </Motion>
      </Wrapper>
    );
  }
}

export default ImgBlock;
