import ViewPopup from '@/projects/components/popup/viewPopup';
import projectPopup from '@/projects/components/projectPopup';

export default function popup(params) {
  new ViewPopup();
  projectPopup();
  const popupWp = document.querySelectorAll('.popup__wp');
  const scrollmouse = document.querySelectorAll('.popup__scrollmouse');

  popupWp.forEach((pop, i) => {
    const popupContent = pop.querySelector('.popup__content');
    if (popupContent.offsetHeight == pop.offsetHeight) {
      scrollmouse[i].classList.add('removed');
    } else {
      scrollmouse[i].classList.remove('removed');
    }
    pop.addEventListener('scroll', (e) => {
      console.log(e);
      if (e.target.scrollTop > 100) {
        scrollmouse[i].classList.add('removed');
      } else {
        scrollmouse[i].classList.remove('removed');
      }
    });
  });
}
