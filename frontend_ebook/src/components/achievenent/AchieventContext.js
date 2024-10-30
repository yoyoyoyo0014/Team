import React, { Component, createContext } from 'react';

// Context 생성
const AchievenentEventContext = createContext();

class AchievenentSwitch extends Component {
  constructor(props) {
    super(props);
    // 초기 상태 설정
    this.state = {
      modalIsOpen: false,
    };
  }

  // 상태를 반환하는 함수
  stateAchievenent = () => {
    return this.state.modalIsOpen;
  }

  // 상태를 true로 설정하는 함수
  OnAchievenent = () => {
    this.setState({ modalIsOpen: true });
  }

  // 상태를 false로 설정하는 함수
  OffAchievenent = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <AchievenentEventContext.Provider
        value={{
          modalIsOpen: this.state.modalIsOpen,
          OnAchievenent: this.OnAchievenent,
          OffAchievenent: this.OffAchievenent,
        }}
      >
        {this.props.children}
      </AchievenentEventContext.Provider>
    );
  }
}

export { AchievenentEventContext, AchievenentSwitch };
