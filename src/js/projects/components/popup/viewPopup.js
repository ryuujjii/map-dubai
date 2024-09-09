import { addClassName, removeClassName } from "utils";
import collectEscEls from "@/components/esc/collectEscEls";
import removeLastEscEl from "@/components/esc/removeLastEscEl";
const projectCloseBtn = document.querySelector(".project__close-btn");
const popupBackground = document.querySelector('.popup__background')
class ViewPopup {
  activePopup = null;
  activeBtn = null;
  canClose = false;
  attributes = {
    classNames: {
      show: "popup-show",
      body: {
        show: "popup-active",
      },
      activeBtn: "active",
    },
    data: {
      popup: "data-popup",
      close: "data-popup-close",
      btn: "data-popup-btn",
    },
  };
  constructor(params) {
    this.popupBtn();
    this.close();
  }

  popupBtn() {
    const popupBtns = document.querySelectorAll(`[${this.attributes.data.btn}]`);

    popupBtns.forEach((currentItem) => {
      currentItem.addEventListener("click", (e) => {
        const popupId = currentItem.getAttribute(this.attributes.data.btn);
        const neededPopup = document.querySelector(`[${this.attributes.data.popup}=${popupId}]`);
        const projectsBtnMobile = document.querySelector('.project__popupBtns-wrapper');
        if (this.activePopup) {
          if (this.activePopup === neededPopup) {
            return;
          } else {
            this.closePopup();
          }
        }
        popupBackground.classList.add('active')
        collectEscEls("close-popup");
        addClassName(neededPopup, this.attributes.classNames.show);
        addClassName(currentItem, this.attributes.classNames.activeBtn);
        addClassName(document.body, this.attributes.classNames.body.show);
        addClassName(projectCloseBtn, "hidden");
        projectsBtnMobile.classList.remove('activee')
        this.activePopup = neededPopup;
        this.activeBtn = currentItem;
        
        setTimeout(() => {
          this.canClose = true;
        }, 100);
      });
    });
  }

  close() {
    window.addEventListener("close-popup", (e) => {
      this.closePopup();
      popupBackground.classList.remove('active')
    });

    // document.addEventListener('keydown', (event) => {
    //   if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
    //     this.activePopup ? this.closePopup() : null;
    //   }
    // });

    document.addEventListener("click", (e) => {
      const target = e.target;
      if (this.canClose && !target.closest(`.popup__wrapper`) && !target.closest(`.project__popupBtns-open`)) {
        this.closePopup();
        popupBackground.classList.remove('active')
      }
    });
  }

  closePopup() {
    this.activePopup?.classList.remove(this.attributes.classNames.show);
    this.activeBtn?.classList.remove(this.attributes.classNames.activeBtn);
    document.body?.classList.remove(this.attributes.classNames.body.show);
    removeClassName(projectCloseBtn, "hidden");
    popupBackground.classList.remove('active')
    this.activePopup = null;
    this.activeBtn = null;
    this.canClose = false;
    removeLastEscEl("close-popup");
  }
}

export default ViewPopup;
