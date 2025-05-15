import { addClassName, removeClassName, dispatchCustomEvent } from "utils";
import collectEscEls from "@/components/esc/collectEscEls";
import removeLastEscEl from "@/components/esc/removeLastEscEl";
const projectCloseBtn = document.querySelector(".project__close-btn");
const popupBackground = document.querySelector(".popup__background");

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
  withMap = true;
  popupBtns;
  constructor(params) {
    this.close();
    window.addEventListener('with-map', (e) => {
      this.withMap = e.detail.withMap;
      if (!this.withMap) {
        dispatchCustomEvent({ el: this.popupBtns[0], event: `click` });
      }
    });
    window.addEventListener('popupBtns-ready', (e) => {
      this.popupBtns = document.querySelectorAll(`[${this.attributes.data.btn}]`);
      this.popupBtn();
    });
  }

  popupBtn() {
    this.popupBtns.forEach((currentItem) => {
      currentItem.addEventListener("click", () => {
        const popupId = currentItem.getAttribute(this.attributes.data.btn);
        const neededPopup = document.querySelector(`[${this.attributes.data.popup}=${popupId}]`);
        const projectsBtnMobile = document.querySelector(".project__popupBtns-wrapper");
        if (this.activePopup) {
          if (this.activePopup === neededPopup) {
            return;
          } else {
            this.closePopup({ onlyPopup: true });
          }
        }
        popupBackground.classList.add("active");
        if ((popupId == "brochure" || popupId == "contact")) {
          popupBackground.classList.add("brochure-open");
          if (this.withMap) {
            document.body.classList.add("hide-btn");
          }
        }

        collectEscEls("close-popup");
        addClassName(neededPopup, this.attributes.classNames.show);
        addClassName(currentItem, this.attributes.classNames.activeBtn);
        addClassName(document.body, this.attributes.classNames.body.show);
        addClassName(projectCloseBtn, "hidden");
        projectsBtnMobile.classList.remove("activee");
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
      this.closePopup(false);
      popupBackground.classList.remove("active");
      popupBackground.classList.remove("brochure-open");
      document.body.classList.remove("hide-btn");
    });


    document.addEventListener("click", (e) => {
      const target = e.target;
      if (this.canClose && !target.closest(`.popup__wrapper`) && !target.closest(`.project__popupBtns-open`) && !target.closest(`.project__btns`)) {
        this.closePopup(false);
        popupBackground.classList.remove("active");
        popupBackground.classList.remove("brochure-open");
        document.body.classList.remove("hide-btn");
      }
    });

    // document.addEventListener('keydown', (event) => {
    //   if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
    //     this.activePopup ? this.closePopup() : null;
    //   }
    // });
  }

  closePopup(onlyPopup = true) {
    this.activePopup?.classList.remove(this.attributes.classNames.show);
    this.activeBtn?.classList.remove(this.attributes.classNames.activeBtn);
    document.body?.classList.remove(this.attributes.classNames.body.show);
    removeClassName(projectCloseBtn, "hidden");
    popupBackground.classList.remove("active");
    popupBackground.classList.remove("brochure-open");
    document.body.classList.remove("hide-btn");
    this.activePopup = null;
    this.activeBtn = null;
    this.canClose = false;
    removeLastEscEl("close-popup");
    if (!this.withMap && !onlyPopup) {
      dispatchCustomEvent({ el: window, event: `close-project` });
      this.withMap = true;
    }
  }
}

export default ViewPopup;
