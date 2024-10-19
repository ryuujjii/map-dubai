import { dispatchCustomEvent } from 'utils';
import { addClassToAlter, removeClassToAlter } from '@/modal360/components/alterParentWindow';
import { Fancybox } from "@fancyapps/ui";
export function popups() {
    const popupOpenBtn = document.querySelector(".viewer-btn-floorplan")
    const popup = document.querySelector('.popup')
    const filter = popup.querySelector(".filter")
    const filterOption = filter.querySelectorAll(".filter__option")
    const filterSelect = filter.querySelectorAll(".filter__select")
    const filterDropdown = filter.querySelectorAll(".filter__dropdown")
    const popupClose = popup.querySelector('.popup__close')
    filterSelect.forEach((select, i) => {
        select.addEventListener('click', () => {
            if (filterOption[i].classList.contains('active')) {
                filterOption[i].classList.remove('active')
            } else {
                filterOption.forEach((option) => {
                    option.classList.remove('active')
                })
                filterOption[i].classList.add('active')
            }

        })
    })
    popupOpenBtn.addEventListener('click', () => {
        addClassToAlter()
        popup.classList.add('active')
    })
    popupClose.addEventListener('click', () => {
        popup.classList.remove("active")
        removeClassToAlter()
    })

    // const btn = document.querySelector('[data-modal360]');
    // btn.addEventListener("click", (e) => {
    //     dispatchCustomEvent({
    //         el: window.parent, event: "update-modal360-media", detail: {
    //             dataModal360: btn.getAttribute('data-modal360')
    //         }
    //     });
    //     popup.classList.remove("active")
    //     removeClassToAlter()
    // });
    // galleryView()
}




// function galleryView() {
//     Fancybox.bind("[data-fancybox='view']", {
//        trapFocus:false,
//        backdropClick:"false",
//         on: {
//         }
//     });
// };

