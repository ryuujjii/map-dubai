import gsap from 'gsap';
import { addClassName, removeClassName, queryMatches } from './utils.js';

export function header() {
  const toggleMenuBtn = document.querySelector('.menu-btn');
  const header = document.querySelector('.header');
  const menu = document.querySelector('.menu');
  const menuLinks = document.querySelectorAll('.menu__link-item');
  const menuTitle = document.querySelector('.menu__title span');
  const LAPTOP_MIN = queryMatches(992, 'min');

  let isMenuOpen = false;

  const tl = gsap.timeline({ paused: true });

  tl.to(header, {
    onStart: function () {
      addClassName(header, 'isMenuOpened');
      addClassName(document.body, 'isMenuOpened');
    },
    onReverseComplete: function () {
      removeClassName(header, 'isMenuOpened');
      removeClassName(document.body, 'isMenuOpened');
    },
  });
  tl.to(
    menu,
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    },
    0
  );
  tl.to(
    menuTitle,
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      autoAlpha: 1,
    },
    0
  );
  if (LAPTOP_MIN) {
    tl.to(
      menuLinks,
      {
        autoAlpha: 1,
        scale: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        duration: 0.15,
        stagger: 0.07,
        delay: LAPTOP_MIN ? 0.1 : 0.2,
      },
      0.1
    );
  }

    toggleMenuBtn.addEventListener('click', () => {
        if (isMenuOpen) {
            tl.timeScale(1.7).reverse();
        } else {
            tl.timeScale(1).play();
        }
        isMenuOpen = !isMenuOpen;
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            tl.timeScale(1.7).reverse();
            isMenuOpen = !isMenuOpen;
        })
    })

}