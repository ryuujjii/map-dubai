
export function popContent(data, dot) {
    const popup = document.querySelector('.popup')
    const viewerBtnFloor = document.querySelector('.viewer-btn-floorplan')
    const placeCheck = popup.querySelector('[data-place-check]')
    const filterType = popup.querySelector('.filter__type')
    const watch360Btn = popup.querySelector('.popup__view-360')
    const bedroomCheck = popup.querySelector('[data-bedroom-check]')
    const typeCheck = popup.querySelector('[data-type-check]')
    const placeHold = popup.querySelector('[data-place-list]')
    const filterSelect = document.querySelectorAll(".filter__select")
    const filterList = document.querySelectorAll(".filter__list")
    const filter = popup.querySelector(".filter")
    const filterWrap = filter.querySelector(".filter__wrap")
    const filterWrapStyles = window.getComputedStyle(filterWrap)
    const filterOption = popup.querySelectorAll(".filter__option")
    const bedroomHold = popup.querySelector('[data-bedroom-list]')
    const typeHold = popup.querySelector('[data-type-list]')
    const viewSwitcher = popup.querySelectorAll('[name="view-switch"]')
    const viewFullWrap = popup.querySelector('.view-full__wrap')
    const viewFullBtn = popup.querySelector('.view-fullbtn')
    const popcontentp = popup.querySelector('[data-popcontent-p]')
    //content
    const dataModel = document.querySelector(".popup__view-model")
    const dataImg = document.querySelector(".popup__view-img")
    const dataInfo = popup.querySelectorAll("[data-info]")
    if (!dot.isActive) {
        viewerBtnFloor.style.display = 'none'
    } else {
        viewerBtnFloor.style.display = 'block'
    }
    let filterElemWidth
    let getInfo = dot
    const allInfo = {
        ...getInfo,
        viewMode: "2d"
    }
    function btn360Hide() {
        if (
            getInfo.place == allInfo.place && getInfo.bedroom == allInfo.bedroom && getInfo.type == allInfo.type ||
            !data[allInfo.place].bedrooms[allInfo.bedroom].types[allInfo.type].dataModal360
        ) {
            watch360Btn.classList.add('hide')
        } else {
            watch360Btn.classList.remove('hide')
        }
    }
    filterWrap.addEventListener('scroll', (e) => {
        if (filterWrap.scrollLeft < 2) {
            filter.classList.remove('s-shadow')
        } else {
            filter.classList.add('s-shadow')
        }
        if (filterElemWidth - filterWrap.offsetWidth - filterWrap.scrollLeft < 2) {
            filter.classList.remove('e-shadow')
        } else {
            filter.classList.add('e-shadow')
        }
    })
    window.addEventListener("change", (e) => {
        if (e.target.name == 'place') {
            allInfo.place = e.target.value
            allInfo.bedroom = data[allInfo.place].default
            allInfo.type = data[allInfo.place].bedrooms[allInfo.bedroom].default
            initContent(allInfo.place, allInfo.bedroom, allInfo.type)
        } else if (e.target.name == 'bedroom') {
            allInfo.bedroom = e.target.value
            allInfo.type = data[allInfo.place].bedrooms[allInfo.bedroom].default
            initContent(allInfo.place, allInfo.bedroom, allInfo.type)
        } else if (e.target.name == 'type') {
            allInfo.type = e.target.value
            initContent(allInfo.place, allInfo.bedroom, allInfo.type)
        } else if (e.target.name == 'view-switch') {
            allInfo.viewMode = e.target.value
            if (allInfo.viewMode == '2d') {
                dataImg.classList.add('active')
                dataModel.classList.remove('active')
                viewFullBtn.setAttribute("data-fancybox-trigger", "view")
            } else {
                viewFullBtn.removeAttribute("data-fancybox-trigger")
                dataImg.classList.remove('active')
                dataModel.classList.add('active')
                // preloaderFun(viewFullWrap)
            }
            // initContent(allInfo.place, allInfo.bedroom, allInfo.type, allInfo.viewMode)
        }
    })
    function placesInfo(data, place) {
        placeCheck.innerHTML = data[place].title
        if (Object.keys(data).length == 1) {
            filterSelect[0].classList.add('alone')
        } else {
            filterSelect[0].classList.remove('alone')
        }
        checkList(placeHold, data, place)
    }
    function bedroomsInfo(bedroomList, bedroom) {
        bedroomCheck.innerHTML = bedroomList[bedroom].title
        checkList(bedroomHold, bedroomList, bedroom)
    }
    function typeInfo(typeList, type) {
        console.log(typeList);
        console.log(type);
        typeCheck.innerHTML = typeList[type].title
        checkList(typeHold, typeList, type)
    }
    // function viewModeFun(place, bedroom, type) {
    //     return `
    //         <model-viewer class="pop-model-viewer" max-camera-orbit="auto 95deg auto" src="${data[place].bedrooms[bedroom].types[type]['3d']}" ar-modes="webxr scene-viewer quick-look" camera-controls="" tone-mapping="commerce" shadow-intensity="1" disable-pan="" disable-zoom="" >
    //         </model-viewer>
    //                 <div class="loader">
    //                       <div class="loader__progress">
    //                         <span>Loading</span>
    //                         <svg class="loader__progress-ring" width="500" height="500">
    //         <circle class="loader__progress-circle" stroke-width="4" cx="250" cy="250" r="246" fill="transparent" />
    //       </svg>
    //                       </div>
    //                  </div>
    //                 `
    // }

    // function preloaderFun(parent) {
    //     const modelViewer = parent.querySelector(".pop-model-viewer")
    //     const loader = parent.querySelector(".loader")
    //     const loaderRing = parent.querySelector(".loader__progress-ring")
    //     const loaderStyle = window.getComputedStyle(loaderRing)
    //     const loaderCircle = parent.querySelector(".loader__progress-circle")
    //     loaderCircle.style.stroke = '#fff'
    //     loaderCircle.setAttribute('cx', parseInt(loaderStyle.width) / 2)
    //     loaderCircle.setAttribute('cy', parseInt(loaderStyle.width) / 2)
    //     loaderCircle.setAttribute('r', parseInt(loaderStyle.width) / 2 - 6)
    //     const radius = loaderCircle.getAttribute('r');
    //     const circumference = 2 * Math.PI * radius;
    //     loaderRing.style.strokeDasharray = `${circumference} ${circumference}`
    //     loaderRing.style.strokeDashoffset = circumference;
    //     function setProgress(percent) {
    //         const offset = circumference - ((percent * 100) / 100 * circumference)
    //         loaderRing.style.strokeDashoffset = offset;
    //     }
    //     let i = 0
    //     modelViewer.addEventListener("progress", (e) => {
    //         const progress = e.detail.totalProgress;
    //         setProgress(progress)
    //         if (progress === 1) {
    //             i++
    //             if (i > 1) {
    //                 loader.classList.add('loaded')
    //             }
    //         }
    //     });

    // }
    function checkList(selector, list, el) {
        let idx = 0
        selector.innerHTML = ""
        for (const key in list) {
            idx++
            selector.innerHTML += `
            <li class="filter__list-item ${list[key].title ? '' : 'hide'}">
            <input class="filter__list-inp"  type="radio" ${el == key ? 'checked' : ''}  value="${key}" name="${list[key].name}" id="${list[el].name}-${idx}" hidden>
            <label class="filter__list-lab"  for="${list[el].name}-${idx}" >
                <div class="filter__list-name" data-name>${list[key].title}</div>
                <span class="icon">
                <svg class="filter__list-icon" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 3.83L3.83 6.66L9.5 1" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </span>
            </label>
         </li>
        `
        }
    }
    function initContent(place, bedroom, type) {
        placesInfo(data, place)
        bedroomsInfo(data[place].bedrooms, bedroom)
        typeInfo(data[place].bedrooms[bedroom].types, type)
        filterSelect.forEach((sel, i) => {
            if (sel.classList.contains('active')) {
                filterList[i].classList.remove('active')
                sel.classList.remove('active')
            }
        })
        viewSwitcher.forEach(view => {
            if (view.value == "2d") {
                view.checked = true
                dataImg.classList.add('active')
                dataModel.classList.remove('active')
            }
        })
        let typeObjs = Object.keys(data[allInfo.place].bedrooms[allInfo.bedroom].types)
        if (typeObjs.length == 1 && typeObjs[0] != "default") {
            filterType.classList.add('alone')
            filterType.classList.remove("no-type")
        } else {
            if (typeObjs[0] == "default") {
                filterType.classList.add("no-type")
                filterType.classList.remove('alone')
            } else {
                filterType.classList.remove("no-type")
                filterType.classList.remove('alone')
            }
        }
        watch360Btn.setAttribute('data-modal360', data[place].bedrooms[bedroom].types[type].dataModal360)
        btn360Hide()
        viewFullBtn.setAttribute("data-fancybox-trigger", "view")
        dataInfo.forEach(info => {
            switch (info.getAttribute("data-info")) {
                case "badroom":
                    info.innerHTML = data[place].bedrooms[bedroom].title
                    break;
                case "type":
                    info.innerHTML = data[place].bedrooms[bedroom].types[type].title
                    break;
                case "bathrooms":
                    if (!data[place].bedrooms[bedroom].types[type].bathrooms) {
                        popcontentp.innerHTML = 'Level'
                        info.innerHTML = data[place].bedrooms[bedroom].types[type].level
                    } else {
                        popcontentp.innerHTML = 'Bathroom'
                        info.innerHTML = data[place].bedrooms[bedroom].types[type].bathrooms
                    }
                    break;
                case "totalArea":
                    info.innerHTML = data[place].bedrooms[bedroom].types[type].totalArea
                    break;
                case "price":
                    info.innerHTML = data[place].bedrooms[bedroom].types[type].price
                    break;
                case "img":
                    info.innerHTML = `
                    <a class="view-full__img" data-fancybox="view" href="${data[place].bedrooms[bedroom].types[type]['2d']}">
                    <img src="${data[place].bedrooms[bedroom].types[type]['2d']}" loading="lazy" alt="">
                </a>
                    `
                    break;
                case "model":
                    // info.innerHTML = viewModeFun(place, bedroom, type)
                    // preloaderFun(info)
                    break;
                case "full-model":
                    // viewFullWrap.innerHTML = viewModeFun(place, bedroom, type)
                    // preloaderFun(viewFullWrap)
                    break;
            }
        });
        filterElemWidth = filterOption[0].offsetWidth + filterOption[1].offsetWidth + filterOption[2].offsetWidth + (parseInt(filterWrapStyles.gap) * (filterOption.length - 1))

        if (filterElemWidth < filterWrap.offsetWidth) {
            filter.classList.remove('s-shadow')
            filter.classList.remove('e-shadow')
        }
    }
    initContent(allInfo.place, allInfo.bedroom, allInfo.type)



}
