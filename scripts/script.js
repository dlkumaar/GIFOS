// importing local modules
import { mobileMenu } from './mobileMenu.js';
import { getTrendingGifs } from './trendingGifs.js';
import { getGifs } from './searchGifs.js';
import { getGifSuggestions } from './SearchSuggestions.js';
import { suggestionBox } from './SearchSuggestions.js';

/**
 * global dom elements
 */
export const inputField = document.getElementById('gif-search-box');
export const form = document.querySelector('#gif-search__form');

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
