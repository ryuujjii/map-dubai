import { addClassName, removeClassName } from 'utils';
class ViewPopup {
  activePopup = null;
  activeBtn = null;

  attributes = {
    classNames: {
      show: "popup-show",
      body: {
        show: 'popup-active'
      },
      activeBtn: "active"
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
        const popupId = currentItem.getAttribute(this.attributes.data.btn);
        const neededPopup = document.querySelector(`[${this.attributes.data.popup}=${popupId}]`);
        if (this.activePopup) {
          if (this.activePopup === neededPopup) {
            return;
          } else {
            this.closePopup();
          }
        }

        addClassName(neededPopup, this.attributes.classNames.show);
        addClassName(currentItem, this.attributes.classNames.activeBtn);
        addClassName(document.body, this.attributes.classNames.body.show);
        this.activePopup = neededPopup;
        this.activeBtn = currentItem;
      });
    });
  }


  close() {
    window.addEventListener('close-popup', (e) => {
      this.closePopup();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
        this.closePopup();
      }
    });
  }


  closePopup() {
    removeClassName(this.activePopup, this.attributes.classNames.show);
    removeClassName(this.activeBtn, this.attributes.classNames.activeBtn);
    removeClassName(document.body, this.attributes.classNames.body.show);
    this.activePopup = null;
    this.activeBtn = null;
  }

}

export default ViewPopup;