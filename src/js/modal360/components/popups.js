import { popContent } from '../content/popups/index.js'
export function popups() {
    const popup = document.querySelector('.popup')
    const popupInner = popup.querySelector('.popup__inner')
    const popupClose = popup.querySelector('.popup__close')
    const filterSelect = popup.querySelectorAll(".filter__select")
    const filterList = popup.querySelectorAll(".filter__list")
    const popupViewFullBtn = popup.querySelector(".view-fullbtn")
    const popupViewFull = popup.querySelector(".view-full")
    const popupViewFullClose = popup.querySelector(".view-full__close")
    popupViewFullBtn.addEventListener('click', () => {
        if(!popupViewFullBtn.hasAttribute("data-fancybox-trigger")){
            popupViewFull.classList.add('active')
        }
    })
    popupViewFullClose.addEventListener('click',()=>{
        popupViewFull.classList.remove('active')
    })
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