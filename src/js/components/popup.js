export function popup() {
    const popupOpenBtns = document.querySelectorAll('[data-marker-popup-btn]');
    const popups = document.querySelectorAll('.home-popup');

    popupOpenBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentBtn = btn.getAttribute('data-marker-popup-btn');

            popups.forEach(popup => {
                if (popup.getAttribute('data-marker-popup') === currentBtn) {
                    popup.classList.add('_show');
                    document.body.classList.add('hide-light-map');
                }

                popup.addEventListener('click', (e) => {
                    if (e.target.classList.contains('home-popup__close') || e.target.classList.contains('home-popup')) {
                        popup.classList.remove('_show');
                        document.body.classList.remove('hide-light-map');
                    }
                });
            });
        });
    });

    const allInputPhone = document.querySelectorAll(`input[type="tel"]`)

    allInputPhone.forEach(phone => {
        phone.addEventListener('input', function (e) {
            let value = e.target.value;

            value = value.replace(/[^0-9+]/g, '');

            if (value.indexOf('+') > 0) {
                value = value.replace(/\+/g, '');
            } else if (value.indexOf('+') === 0) {
                value = '+' + value.slice(1).replace(/\+/g, '');
            }

            e.target.value = value;
        });

    })

}