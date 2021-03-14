// importing local modules
import { _API_KEY as apiKey } from './script.js';

/**
 * dom elements
 */
const trendingGifsBox = document.querySelector('.slider');

/**
 * number of gifs to fetch
 */
const trendingGifsLimit = 9;

// giphy base URL
const baseUrl = 'https://api.giphy.com/v1/gifs/trending?';

/**
 * fetch trending gifs function
 * creates 9 gif cards
 */
export const getTrendingGifs = async () => {
	const endpoint = `${baseUrl}api_key=${apiKey}&limit=${trendingGifsLimit}`;
	try {
		const response = await fetch(endpoint);
		if (response.ok) {
			const jsonResponse = await response.json();

			let dataArray = jsonResponse.data;
			// console.log(dataArray);

			/** Creating Gifs */
			createGifCards(dataArray, trendingGifsBox);
		}
	} catch (error) {
		console.log(error);
	}
};

// trending gifs button box
// let trendingGifButtons = `
// <button>
//   <img src='../assets/icon-fav.svg' class='icon icon-fav' id='icon1' alt='icon-fav' />
// </button>
// <button>
//   <img src='../assets/icon-download.svg' class='icon icon-download' alt='icon-download' />
// </button>
// <button>
//   <img src='../assets/icon-max-normal.svg' class='icon icon-max' alt='icon-max-normal' />
// </button>
//   `;

/**
 * creates 3 absolute positioned
 * buttons for gif cards
 */
let trendingGifButtons = `
<button class='icon icon-fav'></button>
<button class='icon icon-download'></button>
<button class='icon icon-max'></button>
  `;

/**
 * @param {array} array - takes an array objects
 * @param {domElement } ele - where gifs are shown
 */

export function createGifCards(array, ele) {
	array.forEach((gifObject) => {
		let fig = document.createElement('figure');
		let buttonsBox = document.createElement('div');
		let img = document.createElement('img');

		// adding classes
		buttonsBox.classList.add('trending-gifs-buttons');
		img.classList.add('trending-gif-items');

		// dom changes
		buttonsBox.innerHTML = trendingGifButtons;
		fig.appendChild(buttonsBox);

		img.src = gifObject.images.downsized.url;
		img.alt = gifObject.title;

		fig.appendChild(img);

		//inserts card at the start of gifs container
		ele.insertAdjacentElement('afterbegin', fig);
	});
}
