// 'use strict';

// const header = document.querySelector('.header');
// const logoPic = document.querySelector('.logo-pic');
// const links = document.querySelectorAll('.header .link');

// const positionYToMakeHeaderFixed = 450;

// document.addEventListener('scroll', () => {
//     const currentY = window.scrollY;

//     if (shouldHeaderBeFixed(currentY)) {
//         makeHeaderFixed();
//         makeLogoBlack();
//         makeLinksBlack();
//     } else {
//         makeHeaderUnfixed();
//         makeLogoWhite();
//         makeLinksWhite();
//     }
// });

// const shouldHeaderBeFixed = y => y > positionYToMakeHeaderFixed;


// const makeHeaderFixed = () => {
//     header.classList.add('header_fixed');
// }

// const makeHeaderUnfixed = () => {
//     header.classList.remove('header_fixed');
// }


// const makeLinksBlack = () => {
//     links.forEach(link => link.classList.add('link_color_black'));
// }

// const makeLinksWhite = () => {
//     links.forEach(link => link.classList.remove('link_color_black'));
// }


// const makeLogoBlack = () => {
//     logoPic.classList.add('logo-pic_color_black');
// }

// const makeLogoWhite = () => {
//     logoPic.classList.remove('logo-pic_color_black');
// }
