import React, { Component } from "react";
import "./ToolbarComponent.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import Fullscreen from "@material-ui/icons/Fullscreen";
import FullscreenExit from "@material-ui/icons/FullscreenExit";
import SwitchVideoIcon from "@material-ui/icons/SwitchVideo";
import PictureInPicture from "@material-ui/icons/PictureInPicture";
import ScreenShare from "@material-ui/icons/ScreenShare";
import StopScreenShare from "@material-ui/icons/StopScreenShare";
import Tooltip from "@material-ui/core/Tooltip";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import SettingButton from "../../components/SettingButton";
import DeleteButton from "../../components/DeleteButton";

import IconButton from "@material-ui/core/IconButton";

const logo = require("../../assets/images/logo_yellow.png");

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  screenShare() {
    this.props.screenShare();
  }

  stopScreenShare() {
    this.props.stopScreenShare();
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

  toggleChat() {
    this.props.toggleChat();
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
            <span id="navMicButton" onClick={this.micStatusChanged}>
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

            <span id="navCamButton" onClick={this.camStatusChanged}>
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

            {/* <IconButton onClick={this.screenShare}>
                            {localUser !== undefined && localUser.isScreenShareActive() ? <PictureInPicture /> : <ScreenShare />}
                        </IconButton>

                        {localUser !== undefined &&
                            localUser.isScreenShareActive() && (
                                <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                                    <StopScreenShare color="secondary" />
                                </IconButton>
                            )} */}

            <span id="navSwitchCamButton" onClick={this.switchCamera}>
              <SettingButton
                text="카메라 전환"
                aria-label="전면 또는 후면 카메라 전환 버튼입니다."
              />
            </span>
            <span id="fullScreenButton" onClick={this.toggleFullscreen}>
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
            <span id="navLeaveButton" onClick={this.leaveSession}>
              <DeleteButton
                text="통화 종료"
                aria-label="통화 종료 버튼입니다."
              />
            </span>
            {/* <IconButton color="inherit" onClick={this.toggleChat} id="navChatButton" aria-label='채팅 버튼'>
                            {this.props.showNotification && <div id="point" className="" />}
                            <Tooltip title="Chat">
                                <QuestionAnswer />
                            </Tooltip>
                        </IconButton> */}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
