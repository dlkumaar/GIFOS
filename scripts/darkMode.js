import { darkModeBtn } from './script.js';
import { containerWrapper } from './script.js';
import { crossIcon } from './SearchSuggestions.js';
import { createGifosBtn } from './captureGifs.js';

const submitBtnIcon = document.querySelector('#submit-btn-icon');
const logoText = document.querySelector('#GIFOS_1');

export function darkMode() {
	darkModeBtn.addEventListener('click', () => {
		if (darkModeBtn.textContent === 'Modo Nocturno')
			darkModeBtn.textContent = 'Modo Diurno';
		else darkModeBtn.textContent = 'Modo Nocturno';

		// toggle dark class
		containerWrapper.classList.toggle('dark');

		//
		if (containerWrapper.classList.contains('dark')) {
			submitBtnIcon.src = '../assets/icon-search-modo-noct.svg';
			crossIcon.childNodes[1].src = '../assets/close-modo-noct.svg';
			logoText.setAttribute('fill', '#fff');

			createGifosBtn.childNodes[1].src =
				'../assets/CTA-crear-gifo-modo-noc.svg';
		}
		//
		else {
			submitBtnIcon.src = '../assets/icon-search.svg';
			crossIcon.childNodes[1].src = '../assets/close.svg';
			logoText.setAttribute('fill', '#572EE5');
			createGifosBtn.childNodes[1].src = '../assets/button-crear-gifo.svg';
		}
	});
}
