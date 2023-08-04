import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SettingButton from "../../components/SettingButton";
import DeleteButton from "../../components/DeleteButton";

const ToolbarComponent = (props) => {
  const [fullscreen, setFullscreen] = useState(false);
  const naviagte = useNavigate();

  const micStatusChanged = () => {
    props.micStatusChanged();
  };

  const camStatusChanged = () => {
    props.camStatusChanged();
  };

  const screenShare = () => {
    props.screenShare();
  };

  const stopScreenShare = () => {
    props.stopScreenShare();
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    props.toggleFullscreen();
  };

  const switchCamera = () => {
    props.switchCamera();
  };

  const leaveSession = () => {
    props.leaveSession();
    naviagte("/home"); // 버튼 클릭 시 "/home"으로 이동
  };

  const toggleChat = () => {
    props.toggleChat();
  };

  const mySessionId = props.sessionId;
  const localUser = props.user;

  return (
    <AppBar className="toolbar" id="header">
              <Toolbar className="toolbar">
          <div id="navSessionInfo">
            {/* <img id="header_img" alt="OpenVidu Logo" src={logo} /> */}

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
};

export default ToolbarComponent;
