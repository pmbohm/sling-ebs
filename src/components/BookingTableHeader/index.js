import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import locale from '../../locale';

const HeaderContainer = styled.div`
  height: 100%;
  width: 90%;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px 0 rgba(50, 70, 90, 0.1);
  margin: auto;
  margin-top: 20px;
  div {
    display: flex;
    justify-content: space-between;
    button {
      background-color: #ffffff;
      border: 2px solid #dadada;
      border-radius: 2px;
      color: #d2d2d2;
      padding: 10px 25px;
      font-size: 12px;
      margin: 10px;
      cursor: pointer;
    }
  }
`;

export default class BookingTableHeader extends Component {
  static propTypes = {
    onClickPickDate: PropTypes.func.isRequired,
    onClickNextDay: PropTypes.func.isRequired,
    onClickPrevDay: PropTypes.func.isRequired,
  };
  render() {
    return (
      <HeaderContainer>
        <div>
          <button onClick={() => this.props.onClickPrevDay()}>
            {locale.prevDay}
          </button>
          <button onClick={() => this.props.onClickPickDate()}>
            {locale.pickDate}
          </button>
          <button onClick={() => this.props.onClickNextDay()}>
            {locale.nextDay}
          </button>
        </div>
      </HeaderContainer>
    );
  }
}
