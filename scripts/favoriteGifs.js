import { gifs } from './searchGifs.js';
import { section1 } from './script.js';
import { section2 } from './script.js';
/**
 * dom elements
 */
const favNavButton = document.getElementById('favoritos');
const favGifBox = document.querySelector('.favorite-gifs-box');
const favoriteGifEl = document.querySelector('.favorite-gifs');
const noGifs = document.querySelector('.favorite-gifs-box__no-gifs');

// storefav gifs
const favGifs = [];

// sets up local store for favorite gifs
export const setLocalStoreForFavoriteGifs = () => {
	gifs.addEventListener('click', (e) => {
		const favGif = e.target.dataset.favorites;
		console.log(favGif);

		if (favGifs.includes(favGif)) return;

		favGifs.push(favGif);
		localStorage.setItem('favGifs', favGifs);
	});
};

// console.log(favGifs);
function createFavoriteGifs() {
	let favGifs = localStorage.getItem('favGifs');

	// if no items in store exit
	if (favGifs === null) {
		noGifs.classList.remove('hide');
		return;
	}

	noGifs.classList.add('hide');

	// converts string to array
	let favoriteGifsArray = favGifs.split(',');
	// console.log(favoriteGifs);

	// create gif cards
	favoriteGifsArray.forEach((el) => {
		let fig = document.createElement('figure');
		let img = document.createElement('img');
		img.src = el;

		// console.log(el);
		fig.appendChild(img);

		//inserts card at the start of gifs container
		favoriteGifEl.insertAdjacentElement('afterbegin', fig);
	});
}

// event listener on nav button **favoritos**
export const FavButtonEventListener = () => {
	favNavButton.addEventListener('click', () => {
		section1.classList.toggle('hide');
		section2.classList.toggle('hide');
		favGifBox.classList.toggle('show');
		favoriteGifEl.innerHTML = '';

		createFavoriteGifs();
	});
};
