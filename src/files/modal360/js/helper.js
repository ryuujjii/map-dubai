const img360 = [...document.querySelectorAll('.swiper-slide')].reduce((acc, el) => {
  acc.push(el.getAttribute('data-src'));
  return acc;
}, []);
console.log('img360', img360);
const img360preview = [...document.querySelectorAll('.swiper-slide img')].reduce((acc, el) => {
  acc.push(el.getAttribute('src'));
  return acc;
}, []);
console.log('img360preview', img360preview);
const galleryItems = [...document.querySelectorAll('.gallery a')].reduce((acc, el) => {
  acc.push(el.getAttribute('href'));
  return acc;
}, []);
console.log('gallery', galleryItems);

{/* <script src="js/helper.js"></script> */ }