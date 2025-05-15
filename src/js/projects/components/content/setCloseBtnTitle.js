function getCloseBtnTitle() {
    const
        moda360CloseBtn = document.querySelector(".modal360__close-btn-title"),
        moda360CloseBtnTitle = document.querySelector(".modal360__close-btn-title span"),
        moda360CloseBtnType = document.querySelector(".modal360__close-btn-title p")

    return function ({ title, type }) {
        moda360CloseBtnTitle.textContent = title;
        moda360CloseBtnType.textContent = type;

        !type ? moda360CloseBtn.classList.add('empty-title') : moda360CloseBtn.classList.remove('empty-title')
    }

}

const setCloseBtnTitle = getCloseBtnTitle()
export default setCloseBtnTitle