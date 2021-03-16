import { _API_KEY as apiKey, page1 } from './script.js';
// get video stream
// TODO: select sections to hide on load
// navbar create gif icon button
export const createGifosBtn = document.getElementById('create-gifos-button');

// content cotainers
const step1Box = document.getElementById('step1');
const step2Box = document.getElementById('step2');
const step3Box = document.getElementById('step3');
const step4Box = document.getElementById('step4');

// video container and video elements
const videoWrapper = document.querySelector('.get-video');
const initialVideo = document.querySelector('.video-player');
const recordedVideo = document.querySelector('.my-recorded-gif');

// camera buttons
const startRecordingBtn = document.querySelector('.start-recording-btn');
const goToStepTwoBtn = document.querySelector('.step2-btn');
const goToStepThreeBtn = document.querySelector('.step3-btn');
const stopRecordingBtn = document.querySelector('.step4-btn');
const uploadGifBtn = document.querySelector('.step5-btn');

// numbered steps
const steps = document.querySelectorAll('.steps');

// video store & form data
const recordedGifBlob = [];
let mediaRecorder;
let gifForm = new FormData();

// video contraints
const videoConstraints = {
	audio: false,
	video: { width: 360, height: 240 },
};

// clicking on plus icon in navbar
// hides other content on page
// displays video content
// createGifosBtn.addEventListener('click', () => {
// 	// mainContentBox.classList.toggle('hide');
// 	videoWrapper.classList.toggle('hide');
// });

createGifosBtn.addEventListener('click', () => {
	page1.classList.toggle('hide');
	videoWrapper.classList.toggle('hide');
	createGifosBtn.classList.toggle('active');

	if (createGifosBtn.classList.contains('active'))
		createGifosBtn.childNodes[1].src = '../assets/CTA-crear-gifo-active.svg';
	else createGifosBtn.childNodes[1].src = '../assets/button-crear-gifo.svg';
});

// step 1 - preapre for recording
export function prepareForRecording() {
	startRecordingBtn.addEventListener('click', () => {
		step1Box.classList.add('hide');
		steps[0].classList.add('active');
		step2Box.classList.add('active');
		startRecordingBtn.classList.remove('active');
		goToStepTwoBtn.classList.add('active');
	});
}

// step 2 - receive camera access ans show initial video
export function receiveCameraAccess() {
	goToStepTwoBtn.addEventListener('click', () => {
		step2Box.classList.remove('active');
		step3Box.classList.add('active');

		steps[0].classList.remove('active');
		steps[1].classList.add('active');

		goToStepTwoBtn.classList.remove('active');
		goToStepThreeBtn.classList.add('active');
		initialVideo.classList.add('active');

		getVideoStream();
	});
}

// step 3 - start recording
export function startRecording() {
	goToStepThreeBtn.addEventListener('click', () => {
		goToStepThreeBtn.classList.remove('active');
		stopRecordingBtn.classList.add('active');

		mediaRecorder.startRecording();
	});
}

// step 4 - stop recording and create blob object for POST API call
export function stopRecording() {
	stopRecordingBtn.addEventListener('click', () => {
		stopRecordingBtn.classList.remove('active');
		uploadGifBtn.classList.add('active');

		step3Box.classList.remove('active');
		step4Box.classList.add('active');

		steps[1].classList.remove('active');
		steps[2].classList.add('active');

		createBlob();
	});
}

// step 5 - upload gif
export function uploadGif() {
	uploadGifBtn.addEventListener('click', () => {
		stopRecordingBtn.classList.remove('active');

		postGif();
	});
}

/**
 * helper functions
 */

// get video stream function
function getVideoStream() {
	async function getMedia(videoConstraints) {
		try {
			let stream = await navigator.mediaDevices.getUserMedia(videoConstraints);
			initialVideo.srcObject = stream;
			// initialVideo.play();

			mediaRecorder = new RecordRTCPromisesHandler(stream, {
				type: 'gif',
				frameRate: 1,
				quality: 10,
				width: 360,
				hidden: 240,
			});
		} catch (err) {
			console.log(err);
		}
	}

	getMedia(videoConstraints);
}

// create blob object on stop and create file for POST API
const createBlob = async () => {
	await mediaRecorder.stopRecording();
	let blob = await mediaRecorder.getBlob();

	gifForm.append('file', blob, 'myGif.gif');
	console.log(gifForm.get('file'));
};

const gif_header = new Headers();

const options = {
	method: 'POST',
	mode: 'cors',
	headers: gif_header,
	body: gifForm,
};

function postGif() {
	fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, options)
		.then((response) => response.json())
		.then((data) => console.log(data));
}
