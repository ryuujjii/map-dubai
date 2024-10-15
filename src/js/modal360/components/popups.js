import { popContent } from '../content/popups/index.js'
export function popups() {
    const popup = document.querySelector('.popup')
    const popupInner = popup.querySelector('.popup__inner')
    const popupBody = document.querySelector('.popup__body')
    const popupClose = document.querySelector('.popup__close')
    const filter = popup.querySelector(".filter")
    const filterWrap = filter.querySelector(".filter__wrap")
    const filterWrapStyles = window.getComputedStyle(filterWrap)
    const filterSelect = document.querySelectorAll(".filter__select")
    const filterOption = document.querySelectorAll(".filter__option")
    const filterElemWidth = filterOption[0].offsetWidth + filterOption[1].offsetWidth + filterOption[2].offsetWidth + (parseInt(filterWrapStyles.gap) * (filterOption.length-1) )
    const filterList = document.querySelectorAll(".filter__list")
    filterSelect.forEach((el, i) => {
        el.addEventListener('click', () => {
            if (filterList[i].classList.contains('active')) {
                filterList[i].classList.remove('active')
                el.classList.remove('active')
            } else {
                filterList.forEach((list, i) => {
                    list.classList.remove('active')
                    filterSelect[i].classList.remove('active')
                })
                filterList[i].classList.add('active')
                el.classList.add('active')
            }
        })
    });
    filterWrap.addEventListener('scroll', (e) => {
        if (filterWrap.scrollLeft < 5) {
            filter.classList.remove('s-shadow')
        } else {
            filter.classList.add('s-shadow')
        }
        if (filterElemWidth - filterWrap.offsetWidth - (parseInt(filterWrapStyles.gap) * 2) - filterWrap.scrollLeft < 5) {
            filter.classList.remove('e-shadow')
        } else {
            filter.classList.add('e-shadow')
        }
    })
    popup.addEventListener("touchstart", (e) => {
        if (e.target.classList.contains('pop-model-viewer')) {
            popupInner.classList.add('no-scroll')
        }
    })
    popup.addEventListener("touchend", (e) => {
        if (e.target.classList.contains('pop-model-viewer')) {
            popupInner.classList.remove('no-scroll')
        }
    })

    popup.addEventListener('click', (e) => {
        if (e.target.closest('.filter__option')) {
            return;
        }
        filterList.forEach((list, i) => {
            list.classList.remove('active')
            filterSelect[i].classList.remove('active')
        })
    })
    popupClose.addEventListener('click', () => {
        popup.classList.remove("active")
        setTimeout(() => {
            popup.classList.add('active')
        }, 2000);
    })
    setTimeout(() => {
        popup.classList.add('active')
    }, 10);
    fetch("../../../../files/json/popups/db.json")
        .then(data => data.json())
        .then(data =>
            popContent(data)
        )

}