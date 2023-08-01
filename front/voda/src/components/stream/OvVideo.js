import React, { Component } from 'react';
import './StreamComponent.css';
import * as faceapi from 'face-api.js'


export default class OvVideoComponent extends Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
	}

	async componentDidMount() {
		if (this.props && this.props.user.streamManager && !!this.videoRef) {
			console.log('PROPS: ', this.props);
			this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
		}

		if (this.props && this.props.user.streamManager.session && this.props.user && !!this.videoRef) {
			this.props.user.streamManager.session.on('signal:userChanged', (event) => {
				const data = JSON.parse(event.data);
				if (data.isScreenShareActive !== undefined) {
					this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
				}
			});
		}

    // Load face-api.js models asynchronously
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]).then(() => {
      console.log('face-api.js models loaded.');
      // Start face detection
      this.faceMyDetect();
    });
	}

  faceMyDetect = () => {
    setInterval(async () => {
      if (!this.videoRef.current) return;

      const detections = await faceapi.detectAllFaces(this.videoRef.current,
				new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

			console.log('here', detections);
    }, 1000);
  };
	

	componentDidUpdate(props) {
		if (props && !!this.videoRef) {
			this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
		}
	}

	render() {
		return (
			<video
				autoPlay={true}
				id={'video-' + this.props.user.getStreamManager().stream.streamId}
				ref={this.videoRef}
				muted={this.props.mutedSound}
			/>
		);
	}
}
