// importing local modules
import { _API_KEY as apiKey } from './script.js';
import { form } from './script.js';
import { inputField } from './script.js';

// dom elements
export const suggestionBox = document.querySelector('.search-suggestions');
const submitBtn = document.getElementById('submit-btn');
const submitBtnIcon = document.getElementById('submit-btn-icon');
const crossIcon = document.getElementById('cross-icon');

/**
 * Giphy base url for search suggestions
 * Returns and array of ten items
 */
const baseUrl = 'https://api.giphy.com/v1/tags/related/';

/**
 * fetch suggestions api from Giphy
 * and creates list of suggestions
 */

export const getGifSuggestions = () => {
	inputField.addEventListener('keyup', (e) => {
		if ((e.keyCode > 63 && e.keyCode < 91) || e.keyCode === 8) {
			// dom change
			submitBtn.classList.add('hide');
			crossIcon.classList.add('show');

			// data for fetch
			let queryParam = e.target.value;
			let endpoint = `${baseUrl}${queryParam}?api_key=${apiKey}`;

			// fetch call
			if (queryParam.length > 0) {
				try {
					suggestionBox.innerHTML = '';
					fetch(endpoint)
						.then((response) => response.json())
						.then((data) => {
							// gif array
							const dataArray = data.data;

							// create list
							createList(dataArray);
							cleanUp();
						});
				} catch (error) {
					console.log(error);
				}
			} else {
				cleanUp();
				return;
			}
		}
	});
};

/**
 * create suggestion list dropdown function
 * @param {*} array - an array of list items
 * @returns a list dropdown with three items
 */

function createList(array) {
	array.forEach((gif, index) => {
		if (index < 3) {
			const listItem = document.createElement('li');
			listItem.innerHTML = gif.name;
			suggestionBox.classList.add('show-list');
			suggestionBox.appendChild(listItem);
		}
	});
}

// cleanup function
export function cleanUp() {
	// if input value is null
	if (inputField.value.length === 0) {
		suggestionBox.innerHTML = '';
		suggestionBox.classList.remove('show-list');
		submitBtn.classList.remove('hide');
		crossIcon.classList.remove('show');
		return;
	}

	// on form submit
	form.addEventListener('submit', () => {
		suggestionBox.innerHTML = '';
		submitBtn.classList.remove('hide');
		crossIcon.classList.remove('show');
		return;
	});

	// on pressing cross icon
	crossIcon.addEventListener('click', () => {
		inputField.value = '';
		submitBtn.classList.remove('hide');
		crossIcon.classList.remove('show');
		cleanUp();
		return;
	});
}
