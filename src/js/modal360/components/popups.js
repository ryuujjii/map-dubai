import { dispatchCustomEvent } from 'utils';
import { addClassToAlter, removeClassToAlter } from '@/modal360/components/alterParentWindow';
import { Fancybox } from "@fancyapps/ui";

export function popups() {
    const popupOpenBtn = document.querySelector(".viewer-btn-floorplan")
    const popup = document.querySelector('.popup')
    const popupInner = popup.querySelector('.popup__inner')
    const popupClose = popup.querySelector('.popup__close')
    const filterSelect = popup.querySelectorAll(".filter__select")
    const filterList = popup.querySelectorAll(".filter__list")
    const popupViewFullBtn = popup.querySelector(".view-fullbtn")
    const popupViewFull = popup.querySelector(".view-full")
    const popupViewFullClose = popup.querySelector(".view-full__close")
    const modalFloorDef = document.querySelector(".modal-floorplan")
    const modalFloorDefClose = document.querySelector(".modal-floorplan__close")
    const modalFloorDefInner = document.querySelector(".modal-floorplan__inner")
    popupViewFullBtn.addEventListener('click', () => {
        if (!popupViewFullBtn.hasAttribute("data-fancybox-trigger")) {
            popupViewFull.classList.add('active')
        }
    })
    const btn = document.querySelector('[data-modal360]');
    btn.addEventListener("click", (e) => {
        dispatchCustomEvent({
            el: window.parent, event: "update-modal360-media", detail: {
                dataModal360: btn.getAttribute('data-modal360')
            }
        });
        popup.classList.remove("active")
        removeClassToAlter()
    });
    popupOpenBtn.addEventListener('click', () => {
        if (popupOpenBtn.hasAttribute("data-popup-default")) {
            modalFloorDef.classList.add("active")
        } else {
            popup.classList.add('active')
        }
        addClassToAlter()

    })
    modalFloorDef.addEventListener('click', () => {
        modalFloorDef.classList.remove("active")
        removeClassToAlter()
    })
    modalFloorDefClose.addEventListener('click', () => {
        modalFloorDef.classList.remove("active")
        removeClassToAlter()
    })
    modalFloorDefInner.addEventListener('click', (e) => {
        e.stopPropagation()
    })
    popupViewFullClose.addEventListener('click', () => {
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
        removeClassToAlter()
    })
    galleryView()
}




function galleryView() {
    Fancybox.bind("[data-fancybox='view']", {
        trapFocus: false,
        backdropClick: "false",
        on: {
        }
    });
};

