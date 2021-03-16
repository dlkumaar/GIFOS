/**
 *  dom elements
 */
const menuBtn = document.querySelector('.menu-btn');
const menuItems = document.querySelector('.menu-items');
const menuItemsList = document.querySelectorAll('.menu-items');

/**
 *  mobile toggle function
 */

let showMobileMenu = false;
let menuOpen = false;
export const mobileMenu = function mobileMenuToggle() {
	// if mobile menu disabled set to enabled and viceversa
	menuBtn.addEventListener('click', () => {
		if (!menuOpen && !showMobileMenu) {
			menuBtn.classList.add('open');
			menuItems.classList.add('mobile');
			menuOpen = true;
			showMobileMenu = true;
		} else {
			menuBtn.classList.remove('open');
			menuItems.classList.remove('mobile');
			menuOpen = false;
			showMobileMenu = false;
		}
	});
};

menuItemsList.forEach((li) => {
	li.addEventListener('click', () => {
		menuBtn.classList.remove('open');
		menuItems.classList.remove('mobile');
		menuOpen = false;
		showMobileMenu = false;
	});
});
