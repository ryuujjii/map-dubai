export default function btnSocials() {
    const socialsToggleBtn = document.querySelector('.viewer__socials--toggle');
    const viewerSocials = document.querySelector('.viewer__socials');

    socialsToggleBtn.addEventListener('click', () => {
        viewerSocials.classList.toggle('opened')
      })
}