import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 10px;
`;

const Row = styled.div`
  display: flex;
`;

const Item = styled.div`
  width: 20px;
  height: 15px;
  margin-right: 1px;
  margin-bottom: 1px;
`;

const StyledLink = styled.div`
  width: 20px;
  height: 15px;
  opacity: ${props => props.cssOpacity};
  background: ${props => props.color};
  display: ${props => props.show};
`;

class Canvas extends Component {
  showColor(currendId, id) {
    if (currendId === id) {
      return '#44a54a';
    }
    return '#a54479';
  }

  render() {
    const { data, currentId, cssOpacity, onClickFun } = this.props;

    return (
      <Wrapper>
        {data.map(items => (
          <Row key={items.row_id}>
            {items.row.map(item => (
              <Item key={item.id}>
                <StyledLink
                  cssOpacity={cssOpacity}
                  color={this.showColor(currentId, item.id)}
                  show={item.show}
                  onClick={() => onClickFun(item.id)}
                />
              </Item>
            ))}
          </Row>
        ))}
      </Wrapper>
    );
  }
}

export default Canvas;
