import React, { Component } from "react";
import "./ToolbarComponent.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import SettingButton from "../../components/SettingButton";
import DeleteButton from "../../components/DeleteButton";


const logo = require("../../assets/images/logo_yellow.png");

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }


  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  switchCamera() {
    this.props.switchCamera();
  }

  leaveSession() {
    this.props.leaveSession();
    window.location.href = "/home";
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      <AppBar className="toolbar" id="header">
        <Toolbar className="toolbar">
          <div id="navSessionInfo">
            <img id="header_img" alt="OpenVidu Logo" src={logo} />

            {this.props.sessionId && (
              <div id="titleContent">
                <span id="session-title">{mySessionId}</span>
              </div>
            )}
          </div>

          <div className="buttonsContent">
            <span id="navMicButton" onClick={this.micStatusChanged} tabIndex={1}>
              {localUser !== undefined && localUser.isAudioActive() ? (
                <SettingButton
                  text="마이크 끄기"
                  aria-label="현재 마이크가 켜진 상태입니다. 마이크 끄기 버튼"
                />
              ) : (
                <SettingButton
                  text="마이크 켜기"
                  aria-label="현재 마이크가 꺼진 상태입니다. 마이크 켜기 버튼"
                />
              )}
            </span>

            <span id="navCamButton" onClick={this.camStatusChanged} tabIndex={2}>
              {localUser !== undefined && localUser.isVideoActive() ? (
                <SettingButton
                  text="비디오 끄기"
                  aria-label="현재 비디오가 켜진 상태입니다. 비디오 끄기 버튼"
                />
              ) : (
                <SettingButton
                  text="비디오 켜기"
                  aria-label="현재 비디오가 꺼진 상태입니다. 비디오 켜기 버튼"
                />
              )}
            </span>
            <span id="navSwitchCamButton" onClick={this.switchCamera}>
              <SettingButton
                text="카메라 전환"
                aria-label="전면 또는 후면 카메라 전환 버튼입니다."
              />
            </span>
            <span id="fullScreenButton" onClick={this.toggleFullscreen} tabIndex={3}>
              {localUser !== undefined && this.state.fullscreen ? (
                <SettingButton
                  text="일반 화면"
                  aria-label="현재 전체 화면 크기입니다. 일반 화면으로 전환하시려면 클릭하세요."
                />
              ) : (
                <SettingButton
                  text="전체 화면"
                  aria-label="현재 일반 화면 크기입니다. 전체 화면으로 전환하시려면 클릭하세요."
                />
              )}
            </span>
            <span id="navLeaveButton" onClick={this.leaveSession} tabIndex={4}>
              <DeleteButton
                text="통화 종료"
                aria-label="통화 종료 버튼입니다."
              />
            </span>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
