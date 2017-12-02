import React, { Component } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import PropTypes from 'prop-types';
import timeBlue from '../BookingTable/timeblue.svg';
import closeX from '../BookingTable/x.png';

const ModalWrapper = styled.div`
  ${props => {
    if (!props.visable) {
      return css`
        display: none;
      `;
    } else {
      return css`
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
      `;
    }
  }};
`;
const ModalContainer = styled.div`
  background-color: #fefefe;
  border: 1px solid #888;
  width: 32%;
  height: 44%;
  min-width: 461px;
  min-height: 343px;
  border-radius: 8px;
  background-color: #f4f5f9;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.5);
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  font-family: Trebuchet MS;
  font-size: 14px;
  color: #738190;
  img {
    height: 30px;
    padding: 0px 10px;
  }
`;

const ModalHead = styled.div`
  height: 5%;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px 8px 0 0;
  padding: 27px 0;
  font-family: Trebuchet MS;
  font-size: 20px;
  color: #0085ff;
  button {
    border: none;
    background-color: Transparent;
  }
`;

const ModalFooter = styled.div`
  button {
    background-color: #0085ff;
    border: none;
    color: white;
    padding: 10px 54px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-family: Trebuchet MS;
  }
`;

export default class Modal extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.visable) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  render() {
    return (
      <ModalWrapper visable={this.props.visable}>
        <ModalContainer>
          {this.props.modalHeader.length > 0 && (
            <ModalHead>
              <img alt="Blue clock icon" src={timeBlue} />
              {this.props.modalHeader}
              <button onClick={() => this.props.onSubmit2()}>
                <img alt="X button" src={closeX} />
              </button>
            </ModalHead>
          )}
          {this.props.children}
          <ModalFooter>
            <button onClick={() => this.props.onSubmit()}>
              {this.props.modalFooterSubmit}
            </button>
          </ModalFooter>
        </ModalContainer>
      </ModalWrapper>
    );
  }
}

Modal.propTypes = {
  visable: PropTypes.bool.isRequired,
  modalHeader: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onSubmit2: PropTypes.func.isRequired,
  children: PropTypes.shape({}).isRequired,
  modalFooterSubmit: PropTypes.string,
  modalFooterSubmit2: PropTypes.string,
};
Modal.defaultProps = {
  modalHeader: '',
  modalFooterSubmit: '',
  modalFooterSubmit2: '',
};
