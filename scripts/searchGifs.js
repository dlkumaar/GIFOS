// importing local modules
import { _API_KEY as apiKey } from './script.js';
import { createGifCards } from './trendingGifs.js';
import { inputField } from './script.js';
import { cleanUp } from './SearchSuggestions.js';

// dom elements
const out = document.querySelector('.gif-search__out');
const gifsTitle = document.querySelector('.gifs-title');
export const gifs = document.querySelector('.gifs');
const loadMoreBtn = document.querySelector('#load-more-gifs');
const errorCardFig = document.querySelector('.search-error-card');

// giphy base URL & starting params
const params = '?q=';
const baseUrl = 'https://api.giphy.com/v1/gifs/search';

// number of gifs to fetch
const gifsLimit = 12;

export const getGifs = async () => {
	const gifQuery = inputField.value;
	const endpoint = `${baseUrl}${params}${gifQuery}&api_key=${apiKey}&limit=${gifsLimit}`;
	// guard clause
	gifs.innerHTML = '';
	gifs.classList.remove('search-error');

	try {
		const response = await fetch(endpoint);

		if (response.ok) {
			const jsonResponse = await response.json();

			const dataArray = jsonResponse.data;

			/** Sets Gif Search Box Heading */
			gifsTitle.textContent = inputField.value;

			/** Adds a class to gifs container */
			out.classList.add('display-gifs');
			loadMoreBtn.classList.add('show');

			// display an error message API returns false
			errorCard(dataArray, gifs);

			/** Creates Gif cards */
			createGifCards(dataArray, gifs);

			// Sets input field to blank
			inputField.value = '';
			cleanUp();
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * runs only when the array is empty
 * @param {array} array - takes an array
 * @param {domElement } ele - where error message will be shown
 */

function errorCard(array, ele) {
	if (!array.length) {
		let fig = document.createElement('figure');
		let img = document.createElement('img');
		let title = document.createElement('p');

		img.src = `../assets/icon-busqueda-sin-resultado.svg`;
		title.textContent = 'Intenta con otra búsqueda.';

		gifs.classList.add('search-error');
		fig.classList.add('search-error-card');
		title.classList.add('search-error-message');
		loadMoreBtn.classList.add('hide');

		fig.appendChild(img);
		fig.appendChild(title);

		//inserts card at the start of gifs container
		ele.insertAdjacentElement('afterbegin', fig);
	}
}
