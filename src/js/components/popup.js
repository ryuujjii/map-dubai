export function popup() {
    const popupOpenBtns = document.querySelectorAll('[data-marker-popup-btn]')
    const popups = document.querySelectorAll('.home-popup')

    popupOpenBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentBtn = btn.getAttribute('data-marker-popup-btn')

            popups.forEach(popup => {
                const currentPopup = popup.getAttribute('data-marker-popup')

                if (currentBtn === currentPopup) {
                    setTimeout(() => {
                        popup.classList.add('_show')
                        document.body.classList.add('hide-light-map')
                    }, 500);
                }

                popup.addEventListener('click', (e) => {
                    const popupClick = e.target

                    if (popupClick.classList.contains('home-popup__close') || popupClick.classList.contains('home-popup')) {
                        popup.classList.remove('_show')
                        document.body.classList.remove('hide-light-map')
                    }

                })


            })
        })
    })

}