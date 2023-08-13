import { axiosServer } from '../apis/server';
import { tts } from "../apis/tts"
import { OpenVidu } from 'openvidu-browser';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import StreamComponent from './stream/StreamComponent';
import './VideoRoomComponent.css';
import '../styles/simple/video.css'

import SettingButton from '../components/SettingButton';
import OpenViduLayout from '../layout/openvidu-layout';
import UserModel from '../constants/user-model';

import { offCalling } from "../apis/calling";
import ToolbarComponentClass from './toolbar/ToolbarComponentClass';
import ToolbarComponent from './toolbar/ToolbarComponent';

// export const getUserHandicap = async () => {
//   const res = await axiosServer().get(`/users/mypage`);
//   return res.data.useHandicap;
// }

var localUser = new UserModel();
const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080/voda/';

const userHandicap = sessionStorage.getItem("userHandicap")

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    let sessionName = this.props.sessionName ? this.props.sessionName : 'SessionA';
    let userName = this.props.user ? this.props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100);
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      currentVideoDevice: undefined,
      // currentExpressionData: undefined,
    };

    this.audioPlayer = new Audio();
    this.typeNo = this.props.typeNo;
    this.isIncall = this.props.isIncall;
    const advices = [
      [
        "화난 표정을 하고 있어요. 기분이 안좋아 보이는데 무슨 일이 있냐고 물어보세요."
      ],
      [
        "역겨운 표정을 하고 있어요. 기분이 안좋아 보이는데 무슨 일이 있냐고 물어보세요."
      ],
      [
        "행복한 표정을 하고 있어요. 오늘 어떤 좋은 일이 있었는지 물어보세요.",
        "행복한 표정을 하고 있어요. 상대방이 행복해 하니까 나도 행복하다고 공감을 표시해 보세요.",
        "행복한 표정을 하고 있어요. 상대방의 기쁨을 함께 나누며 대화를 이어가보세요."
      ],
      [
        "무표정을 하고 있어요. 오늘 하루동안 있었던 일로 대화를 시작해볼까요?",
        "무표정을 하고 있어요. 상대방의 관심사로 대화를 시작해볼까요?",
        "무표정을 하고 있어요. 상대방이 무슨 생각을 하고 있는지 물어보세요."
      ],
      [
        "슬픈 표정을 하고 있어요. 위로의 말을 건네보세요",
        "슬픈 표정을 하고 있어요. 도움이 필요하면 언제든지 얘기하라고 위로의 말을 건네보세요",
        "슬픈 표정을 하고 있어요. 함께 슬픔을 나누며 따뜻한 말을 건네보세요.",
      ],
      [
        "무서운 표정을 하고 있어요. 무슨 일이 있었는지 물어보세요.",
      ],
      [
        "놀란 표정을 하고 있어요. 무슨 일이 있었는지 물어보세요",
        "놀란 표정을 하고 있어요. 상대방의 놀란 마음에 공감을 표시해 보세요",
      ],
      [
        "표정이 감지되지 않았습니다."
      ]
    ];
    

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.hearExpression = this.hearExpression.bind(this);
    this.sendExpression = this.sendExpression.bind(this);
  }

  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: 'OV_big', // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    // console.log(this.props.token);

    this.layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
    window.addEventListener('beforeunload', this.onbeforeunload);
    window.addEventListener('resize', this.updateLayout);
    window.addEventListener('resize', this.checkSize);
    this.joinSession();
  }


  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    window.removeEventListener('resize', this.updateLayout);
    window.removeEventListener('resize', this.checkSize);
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  joinSession() {
    this.OV = new OpenVidu();

    console.log(this.props.callNo);

    this.setState(
      {
        session: this.OV.initSession(),
      },
      async () => {
        this.subscribeToStreamCreated();
        await this.connectToSession();
      },
    );
  }

  async connectToSession() {
    if (this.props.token !== undefined) {
      console.log('token received: ', this.props.token);
      this.connect(this.props.token);
    } else {
      try {
        var token = await this.getToken();
        console.log(token);
        this.connect(token);
      } catch (error) {
        console.error('There was an error getting the token:', error.code, error.message);
        if (this.props.error) {
          this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
        }
        alert('There was an error getting the token:', error.message);
      }
    }
  }

  connect(token) {
    this.state.session
      .connect(
        token,
        { clientData: this.state.myUserName },
      )
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
        }
        alert('There was an error connecting to the session:', error.message);
        console.log('There was an error connecting to the session:', error.code, error.message);
      });
  }

  async connectWebCam() {
    await this.OV.getUserMedia({ audioSource: undefined, videoSource: undefined });
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter(device => device.kind === 'videoinput');

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: '640x480',
      frameRate: 30,
      insertMode: 'APPEND',
    });

    if (this.state.session.capabilities.publish) {
      publisher.on('accessAllowed', () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });

    }
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();

    this.setState({ currentVideoDevice: videoDevices[0], localUser: localUser }, () => {
      this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
        this.updateLayout();
        publisher.videos[0].video.parentElement.classList.remove('custom-class');
      });
    });
  }

  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
          });
        }
        this.updateLayout();
      },
    );
  }

  leaveSession() {
    const mySession = this.state.session;
    console.log("video컴포넌트 에 왔니? : " + this.props.callNo);

    //voda :ysh
    //back server 통화 종료
    offCalling(this.props.callNo)
      .then((res) => {
        if (mySession) {
          mySession.disconnect();
        }
    
        // Empty all properties...
        this.OV = null;
        this.setState({
          session: undefined,
          subscribers: [],
          mySessionId: 'SessionA',
          myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
          localUser: undefined,
        });
        /*if (this.props.leaveSession) {
          this.props.leaveSession();
        }*/
      })
      .catch((err) => {
        console.log(err);
      });

  }
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  nicknameChanged(nickname) {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() });
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on('streamCreated', (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on('streamPlaying', (e) => {
        subscriber.videos[0].video.parentElement.classList.remove('custom-class');
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType('remote');
      const nickname = event.stream.connection.data.split('%')[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        console.log('stream destroyed!!');
      }, 20);
      event.preventDefault();
      this.updateLayout();
    });
  }

  // voda - KJW
  playExpression = (expressionData) => {

    let text = '';
    switch(expressionData.expression){
      case 'angry': 
        text = '화난 표정';
        break;
      case 'disgust': 
        text = '역겨운 표정';
        break;
      case 'happy': 
        text = '행복한 표정';
        break;
      case 'neutral': 
        text = '무표정';
        break;
      case 'sad': 
        text = '슬픈 표정';
        break;
      case 'scared': 
        text = '무서운 표정';
        break;
      case 'surprised': 
        text = '놀란 표정';
        break;
      default:
        text = '표정이 감지되지 않았습니다.';
    }
    let voiceName = this.typeNo === 0? 'ko-KR-Neural2-C' : 'ko-KR-Neural2-A';
    tts(text, voiceName);
  };

  // voda - KJW
  playExpressionWithAdvice = (expressionData) => {
    let index = 0;
    switch(expressionData.expression){
      case 'angry': 
        index = 0;
        break;
      case 'disgust': 
        index = 1;
        break;
      case 'happy': 
        index = 2;
        break;
      case 'neutral': 
        index = 3;
        break;
      case 'sad': 
        index = 4;
        break;
      case 'scared':
        index = 5; 
        break;
      case 'surprised': 
        index = 6;
        break;
      default:
        index = 7;
    }

    let text = this.advices[index][Math.floor(Math.random() * this.advices[index].length)];
    let voiceName = this.typeNo === 2? 'ko-KR-Neural2-C' : 'ko-KR-Neural2-A';
    tts(text, voiceName);
  };

  // voda - KJW
  tts(text, voiceName){
    console.log('typeNo:', this.typeNo);
    const requestData = {
      input: {
        text: text,
      },
      voice: {
        languageCode: 'ko-KR',
        name: voiceName,
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
    };

    tts(requestData)
      .then((res) => {
        const audioData = res.audioContent;
        const audioArrayBuffer = Uint8Array.from(atob(audioData), c => c.charCodeAt(0)).buffer;
        const audioBlob = new Blob([audioArrayBuffer], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);

        this.audioPlayer.src = audioUrl;
        this.audioPlayer.play();
      }
      )
      .catch(error => {
        console.error('TTS API 요청 중 오류:', error);
      });
  }

  subscribeToUserChanged() {
    // voda - KJW
    this.state.session.on('signal:request', (event) => {
      // remote user에 대해서만 sendExpression함수 실행
      if (event.from.connectionId !== this.state.session.connection.connectionId) {
        this.sendExpression();
      }
    });

    // voda - KJW
    this.state.session.on('signal:send-expression', (event) => {
      if (event.from.connectionId !== this.state.session.connection.connectionId) {
        console.log('typeNo:', this.typeNo);
        if(this.typeNo === 0 || this.typeNo === 1){
          this.playExpression(JSON.parse(event.data));
        }else{
          this.playExpressionWithAdvice(JSON.parse(event.data));
        }
      }
    });

    this.state.session.on('signal:userChanged', (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log('EVENTO REMOTE: ', event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
      );
    });
  }

  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    this.state.session.signal(signalOptions);
  }

  toggleFullscreen() {
    const document = window.document;
    const fs = document.getElementById('container');
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices()
      var videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {

        var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.localUser.getStreamManager());
          await this.state.session.publish(newPublisher)
          this.state.localUser.setStreamManager(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            localUser: localUser,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  checkSize() {
    if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
      this.hasBeenUpdated = true;
    }
    if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
      this.hasBeenUpdated = false;
    }
  }

  // voda - KJW
	sendExpression = () => {
    // Check if the localUser is connected and has a stream manager
		if (this.state.localUser && this.state.localUser.getStreamManager()) {
      console.log('표정 데이터: ', this.props.expressionData)
		  // Send the text data as a broadcast message to all participants
		  this.state.session.signal({
			data: JSON.stringify(this.props.expressionData),
			to: [], // Empty array means broadcast to everyone
			type: 'send-expression', // Use the same type as the receiver is listening to
		  })
		  .then(() => {
			console.log('Expression data successfully sent');
		  })
		  .catch(error => {
			console.error('Error sending expression data:', error);
		  });
		}
	}

  // voda -KMJ
	// handleExpressionDataFromStream = (expressionData) => {
	// 	if (expressionData && expressionData.length > 0) {
	// 		// console.log('하위에서 콜백 받은 데이터: ', expressionData);
	// 		let highestExpression = { expression: '', probability: 0 };
	// 		expressionData.forEach((data) => {
	// 			if (data) {     // data 일부 객체에 대해서 undefined 된 경우 무시,
	// 				// console.log('가장 높게 검출된 표정 데이터:', data);
	// 				for (const [expression, probability] of Object.entries(data)) {
	// 					// console.log(expression, probability);
	// 					// Object.entries 메서드로 순회하기 때문에 객체의 프로퍼티 중 하나라도 undefined이면 for 문에서 무시됩니다.
	// 					if (probability > highestExpression.probability) {
	// 						highestExpression = { expression, probability };
	// 					}
	// 				}
	// 			}
	// 		});
	
	// 		// console.log('가장 높게  검출된 표정:', highestExpression);
	// 		this.setState({ currentExpressionData: highestExpression });
	// 	}
	// }

  // voda - KJW
	hearExpression = () => {
		if (this.state.localUser && this.state.localUser.getStreamManager()) {
			this.state.session.signal({
			data: '요청',
			to: [],
			type: 'request', // Use the same type as the receiver is listening to
			})
			.then(() => {
				console.log('Expression data successfully requested');
			})
			.catch(error => {
				console.error('Error getting expression data:', error);
			});
		}
	}


  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;

    return (
      <div className="container" id="container">
        <ToolbarComponent tabIndex = {2}
          sessionId={mySessionId}
          user={localUser}
          camStatusChanged={this.camStatusChanged}
          micStatusChanged={this.micStatusChanged}
          toggleFullscreen={this.toggleFullscreen}
          switchCamera={this.switchCamera}
          leaveSession={this.leaveSession}
          hearExpression={this.hearExpression}
          sendExpression={this.sendExpression}
        />

        <div id="layout" className="bounds">
          {this.state.subscribers.map((sub, i) => (
            <div key={i} className="OT_root OT_subscriber custom-class" id="remoteUsers">
              <StreamComponent user={sub} streamId={sub.streamManager.stream.streamId} />
            </div>
          ))}
          {localUser !== undefined && localUser.getStreamManager() !== undefined && (
            <div className="OT_root OT_publisher custom-class" id="localUser">
              {/* <StreamComponent user={localUser} handleNickname={this.nicknameChanged} handleExpressionData={this.handleExpressionDataFromStream}/> */}
              <StreamComponent user={localUser} handleNickname={this.nicknameChanged}/>
            </div>
          )}
          </div>
          {/* <div>
            {getUserHandicap ? (<SettingButton tabIndex={1} id='hearExpression' text='표정 듣기' onClick={this.hearExpression} aria-label='표정 듣기 버튼입니다.'  />
            ) : (<SettingButton tabIndex={1} id='sendExpression' text='표정 보내기' onClick={this.sendExpression} aria-label='표정 보내기 버튼입니다.' />
            )}
            <SettingButton id='hearExpression' text='표정 듣기' onClick={this.hearExpression} aria-label='표정 듣기 버튼입니다.' />
                          <SettingButton id='sendExpression' text='표정 보내기' onClick={this.sendExpression} aria-label='표정 보내기 버튼입니다.' />
        </div> */}
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  // async getToken() {
  //     const sessionId = await this.createSession(this.state.mySessionId);
  //     return await this.createToken(sessionId);
  // }

  // async createSession(sessionId) {
  //     const response = await axios.post(APPLICATION_SERVER_URL + 'meetings/sessions', { customSessionId: sessionId }, {
  //         headers: { 'Content-Type': 'application/json', },
  //     });
  //     return response.data; // The sessionId
  // }

  // async createToken(sessionId) {
  //     const response = await axios.post(APPLICATION_SERVER_URL + 'meetings/sessions/' + sessionId + '/connections', {}, {
  //         headers: { 'Content-Type': 'application/json', },
  //     });
  //     return response.data; // The token
  // }
}

// 리덕스 스토어의 userSetting 값을 VideoRoomComponent 컴포넌트의 props로 매핑
const mapStateToProps = state => {
  return {
    typeNo: state.user.userSetting.userSettingTypeNo,
    isIncall: state.call.isIncall,
    expressionData : state.expression.expressionData,
  };
};

export default connect(mapStateToProps)(VideoRoomComponent);
