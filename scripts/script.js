// importing local modules
import { mobileMenu } from './mobileMenu.js';
import { getTrendingGifs } from './trendingGifs.js';
import { getGifs } from './searchGifs.js';
import { getGifSuggestions } from './SearchSuggestions.js';
import { suggestionBox } from './SearchSuggestions.js';
import { setLocalStoreForFavoriteGifs } from './favoriteGifs.js';
import { FavButtonEventListener } from './favoriteGifs.js';
import { prepareForRecording } from './captureGifs.js';
import { receiveCameraAccess } from './captureGifs.js';
import { startRecording } from './captureGifs.js';
import { stopRecording } from './captureGifs.js';
import { uploadGif } from './captureGifs.js';
import { darkMode } from './darkMode.js';

/**
 * global dom elements
 */
export const darkModeBtn = document.getElementById('dark-mode');
export const containerWrapper = document.getElementById('wrapper');

export const logo = document.querySelector('.logo');

export const page1 = document.getElementById('page-1');

export const section1 = document.querySelector('.banner');
export const section2 = document.querySelector('.gif-search');
export const section3 = document.querySelector('.favorite-gifs-box');
export const section4 = document.querySelector('.get-video');
// export const section5 = document.querySelector('.gif-search');
export const section6 = document.querySelector('.trending-gifs');
export const inputField = document.getElementById('gif-search-box');
export const form = document.querySelector('#gif-search__form');

// page reload on logo click
logo.addEventListener('click', () => {
	location.reload();
});

/**
 * Gif api key
 */
export const _API_KEY = 'ADpCM7cnBvxoHXUIOsdHBsE3uTodbLoc';

/**
 *  Mobile toggle function
 **************************************/
mobileMenu();

/**
 *  get trending gifs
 **************************************/
getTrendingGifs();

/**
 *  show searched gifs
 **************************************/
form.addEventListener('submit', (event) => {
	event.preventDefault();

	if (!inputField.value) {
		return;
	}

	getGifs();
});

/**
 *  show gif search suggestions dropdown
 **************************************/
getGifSuggestions();

/**
 *  creates gif card on click on
 * 	suggestions dropdown
 **************************************/
suggestionBox.addEventListener('click', (e) => {
	inputField.value = e.target.innerHTML;
	getGifs();
});

/**
 * 	set local store for favorite gifs
 * 	call event listener on nav button **favoritos**
 **********************************************/
setLocalStoreForFavoriteGifs();
FavButtonEventListener();

/**
 * 	capture gif
 * ----- show welcome message
 * ----- ask camera persmission and show realtime capture
 * ----- start recording
 * ----- stop recording and recording
 **********************************************/
prepareForRecording();
receiveCameraAccess();
startRecording();
stopRecording();
uploadGif();

//
darkMode();
