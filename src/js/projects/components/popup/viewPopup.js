import { addClassName, removeClassName } from 'utils';
class ViewPopup {
  activePopup = null;

  attributes = {
    classNames: {
      show: "popup-show",
      body: {
        show: 'popup-active'
      }
    },
    data: {
      popup: "data-popup",
      close: "data-popup-close",
      btn: "data-popup-btn"
    }
  };
  constructor(params) {
    this.popupBtn();
    this.close();
  }

  popupBtn() {
    const popupBtns = document.querySelectorAll(`[${this.attributes.data.btn}]`);

    popupBtns.forEach(currentItem => {
      currentItem.addEventListener("click", (e) => {
        if (this.activePopup) {
          this.closePopup();
        }
        const popupId = currentItem.getAttribute(this.attributes.data.btn);
        const neededPopup = document.querySelector(`[${this.attributes.data.popup}=${popupId}]`);
        addClassName(neededPopup, this.attributes.classNames.show);
        addClassName(document.body, this.attributes.classNames.body.show);
        this.activePopup = neededPopup;
      });
    });
  }


  close() {
    const closeBtns = document.querySelectorAll(`[${this.attributes.data.close}]`);
    closeBtns.forEach(closeBtn => {
      closeBtn.addEventListener("click", (e) => {
        this.closePopup();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
        this.closePopup();
      }
    });
  }


  closePopup() {
    removeClassName(this.activePopup, this.attributes.classNames.show);
    removeClassName(document.body, this.attributes.classNames.body.show);
    this.activePopup = null;
  }

}

export default ViewPopup;