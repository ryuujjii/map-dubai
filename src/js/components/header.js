import {
    addClassName,
    removeClassName,
    removeClasses,
    queryMatches,
    toggleClassName,
    isMobileOrTablet,
} from "./utils.js";

export function header() {
    const toggleMenuBtn = document.querySelector('.menu-btn')
    const header = document.querySelector('.header')
    const menu = document.querySelector('.menu')

    toggleMenuBtn.addEventListener('click', () => {
        toggleClassName(header, 'isMenuOpened')
        toggleClassName(menu, 'isMenuOpened')
    })
}