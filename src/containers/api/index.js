import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-dates/initialize';
import { DayPickerSingleDateController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import styled from 'styled-components';

import * as ApiActions from '../../components/Actions/actions';

import BookingTable from '../../components/BookingTable';
import BookingTableHeader from '../../components/BookingTableHeader';

const DayPickerWrapper = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  background-color: rgba(0, 0, 0, 0.4);
  & > div{
    position: absolute;
    top: 50%;
    left 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`;
class Api extends Component {
  static propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    dataUsers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        length: PropTypes.numb,
      })
    ),
    userInfo: PropTypes.shape({}).isRequired,
    postShift: PropTypes.func.isRequired,
    fetchAllUserInfo: PropTypes.func.isRequired,
    fetchSessionData: PropTypes.func.isRequired,
    fetchChannel: PropTypes.func.isRequired,
  };
  static defaultProps = {
    dataUsers: [],
    sessionData: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModal2: false,
      showModal3: false,
      name: '',
      date: moment(),
      date2: moment(),
      numberOfMonths: 1,
      keepOpenOnDateSelect: true,
      focused: true,
      range: [],
      sessionData: [],
    };
  }

  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchAllUserInfo();
    this.props.fetchSessionData();
    this.props.fetchChannel();
  }
  //nota til að stoppa scroll þegar daypicker er í gangi
  componentDidUpdate(prevProps, prevState) {
    if (this.state.showModal3) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  nextDay() {
    const newDate = this.state.date.clone();
    newDate.add(1, 'days');
    this.setState({ date: newDate });
  }
  prevDay() {
    let newDate = this.state.date.clone();
    newDate = newDate.subtract(1, 'days');
    this.setState({ date: newDate });
  }

  DayPickerSingleDateController_onOutsideClick() {
    this.setState({ showModal3: false });
  }

  clickDay(bla) {
    const newDate = bla.clone();
    this.setState({
      date: newDate,
      showModal3: false,
    });
  }

  render() {
    return (
      <div>
        <BookingTableHeader
          date={this.state.date}
          prevDay={this.state.date.set('hour', 0).isAfter(moment())}
          onClickPickDate={() => this.setState({ showModal3: true })}
          onClickNextDay={() => this.nextDay()}
          onClickPrevDay={() => this.prevDay()}
        />
        <BookingTable
          dateMain={this.state.date}
          userInfo={this.props.userInfo}
        />
        {this.state.showModal3 === true && (
          <DayPickerWrapper>
            <DayPickerSingleDateController
              hideKeyboardShortcutsPanel={true}
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={date => this.clickDay(date)}
              numberOfMonths={this.state.numberOfMonths}
              isOutsideRange={day => {
                const min = moment().subtract(1, 'd');
                const max = moment().add(3, 'months');
                return day.isBefore(min) || day.isAfter(max);
              }}
              enableOutsideDays={false}
              onOutsideClick={() =>
                this.DayPickerSingleDateController_onOutsideClick()}
            />
          </DayPickerWrapper>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.UserReducer,
  sessionData: state.ApiReducer.dataSession,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ApiActions,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Api);
