// importing local modules
import { _API_KEY as apiKey } from './script.js';
import { createGifCards } from './trendingGifs.js';
import { inputField } from './script.js';
import { cleanUp } from './SearchSuggestions.js';

// dom elements
const out = document.querySelector('.gif-search__out');
const gifsTitle = document.querySelector('.gifs-title');
const gifs = document.querySelector('.gifs');

// giphy base URL & starting params
const params = '?q=';
const baseUrl = 'https://api.giphy.com/v1/gifs/search';

// number of gifs to fetch
const gifsLimit = 12;

export const getGifs = async () => {
	const gifQuery = inputField.value;
	const endpoint = `${baseUrl}${params}${gifQuery}&api_key=${apiKey}&limit=${gifsLimit}`;

	try {
		const response = await fetch(endpoint);

		if (response.ok) {
			const jsonResponse = await response.json();

			const dataArray = jsonResponse.data;
			console.log(dataArray);

			/** Sets Gif Search Box Heading */
			gifsTitle.textContent = inputField.value;

			/** Adds a class to gifs container */
			out.classList.add('display-gifs');

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
