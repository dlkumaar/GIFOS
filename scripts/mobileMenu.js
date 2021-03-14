/**
 *  dom elements
 */
const menuBtn = document.querySelector('.menu-btn');
const menuItems = document.querySelector('.menu-items');

/**
 *  mobile toggle function
 */

export const mobileMenu = function mobileMenuToggle() {
	let showMobileMenu = false;
	let menuOpen = false;

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
