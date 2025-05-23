
import loadMedia from "./loadMedia.js"
function getPopContentFn() {
    const popup = document.querySelector('.popup')
    const viewerBtnFloor = document.querySelector('.viewer-btn-floorplan')
    const filter = popup.querySelector(".filter")
    const filterWrap = filter.querySelector(".filter__wrap")
    const filterInner = filter.querySelector(".filter__inner")
    let filterGap = parseInt(getComputedStyle(filterWrap).gap)
    const projectWrap = popup.querySelector('.project')
    const placeWrap = popup.querySelector(".place__list")
    const floorWrap = popup.querySelector('.floor__list')
    const typeWrap = popup.querySelector('.type__list')
    const bedInfoWrap = popup.querySelector(".popup__content-list")
    const filterOption = filter.querySelectorAll(".filter__option")
    const filterSelect = filter.querySelectorAll(".filter__select")
    const dataSelect = popup.querySelectorAll("[data-select]")
    const dataInfo = popup.querySelectorAll("[data-info]")
    const dataView = popup.querySelectorAll("[data-view]")
    const viewSwitch = popup.querySelectorAll('[name="view-switch"]')
    const viewSwitcher = popup.querySelector('.popup__view-switcher')
    const viewFullBtn = popup.querySelectorAll('.view-fullbtn')
    const popFloors = popup.querySelector('.popup__floor')
    const view360Btn = popup.querySelector('.popup__view-360')
    let allInfo
    let data
    let getInfo
    function wayToElem(elem) {
        switch (elem) {
            case "place":
                return data[allInfo.place]
            case "project":
                return data[allInfo.place].projects[allInfo.project]
            case "bedroom":
                return data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom]
            case "type":
                return data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type]
            case "floor":
                return data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].floors[allInfo.floor]

        }
    }
    let filterElemWidth = 0
    if (filterInner.offsetWidth < filterWrap.offsetWidth) {
        filter.classList.add('e-shadow')
    }
    function listInit(obj) {
        const { idx, el, val, check, name } = obj
        return `
        <li class="sort__list-item">
            <input type="radio" name="${name}" value="${val}"  ${check ? 'checked' : ''} id="${el.name}-${idx}" hidden>
            <label for="${el.name}-${idx}">
            ${el.title}
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 3.83L3.83 6.66L9.5 1" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </label>
        </li>
        `
    }
    filterInner.addEventListener('scroll', (e) => {
        if (filterInner.scrollLeft < 5) {
            filter.classList.remove('s-shadow')
        } else {
            filter.classList.add('s-shadow')
        }
        if (filterWrap.offsetWidth - filterInner.offsetWidth - filterInner.scrollLeft < 5) {
            filter.classList.remove('e-shadow')
        } else {
            filter.classList.add('e-shadow')
        }
    })

    function placeInit(data) {
        if (Object.keys(data).length <= 1) {
            filterSelect[0].classList.add('alone')
        } else {
            filterSelect[0].classList.remove('alone')
        }
        let i = 0
        placeWrap.innerHTML = ''
        for (const key in data) {
            i++
            placeWrap.innerHTML += listInit({
                idx: i,
                el: data[key],
                val: key,
                name: "place",
                check: key == allInfo.place
            })
        }
    }
    function projectInit(data) {
        projectWrap.innerHTML = ''
        let j = 0
        let bool = false
        for (const proj in data) {
            if (Object.keys(data[proj].bedrooms).length <= 1) {
                filterSelect[1].classList.add('alone')
            } else {
                filterSelect[1].classList.remove('alone')
            }
            let bedrooms = ''
            for (const bed in data[proj].bedrooms) {
                bool = (bed == allInfo.bedroom && proj == allInfo.project)
                j++
                bedrooms += listInit({
                    idx: j,
                    el: data[proj].bedrooms[bed],
                    val: `${bed},${proj}`,
                    name: "bedroom",
                    check: bool
                })
            }
            projectWrap.innerHTML +=
                `
    <li class="project__item">
        <span class="project__item-name ${data[proj].title ? '' : "hide"}"  >${data[proj].title}</span>
        <ul class="project__list" data-option-list="bedroom">
        ${bedrooms}
        </ul>
    </li>
    `

        }
    }
    function switchView() {
        viewSwitch.forEach(sw => {
            if (allInfo.viewMode == sw.value) {
                sw.checked = true
                if (allInfo.viewMode == "2d") {
                    viewFullBtn[1].classList.add('hide')
                    viewFullBtn[0].classList.remove('hide')
                } else {
                    viewFullBtn[1].classList.remove('hide')
                    viewFullBtn[0].classList.add('hide')
                }
                dataView.forEach(el => {
                    if (el.getAttribute('data-view') == allInfo.viewMode) {
                        el.classList.add('active')
                    } else {
                        el.classList.remove('active')
                    }
                })
            }
        })
    }
    function typeInit(data) {

        typeWrap.innerHTML = ''
        let i = 0
        if (Object.keys(data).length <= 1) {
            if (data.default) {
                filterSelect[2].classList.add('no-type')
                filterSelect[2].classList.remove('alone')
            } else {
                filterSelect[2].classList.remove('no-type')
                filterSelect[2].classList.add('alone')
            }
        } else {
            filterSelect[2].classList.remove('no-type')
            filterSelect[2].classList.remove('alone')
        }
        for (const type in data) {
            i++
            typeWrap.innerHTML += listInit({
                idx: i,
                el: data[type],
                val: type,
                name: "type",
                check: type == allInfo.type
            })
        }
    }
    function floorInit(data) {
        floorWrap.innerHTML = ''
        let i = 0
        if (data.default) {
            popFloors.classList.add("hide")
        } else {
            popFloors.classList.remove("hide")
            for (const floor in data) {
                i++
                floorWrap.innerHTML +=
                    `
                <li class="floor__list-item">
                <input type="radio" name="${data[floor].name}" ${floor == allInfo.floor ? 'checked' : ''} value="${floor}" id="${data[floor].name}-${i}" hidden>
                <label for="${data[floor].name}-${i}">${data[floor].title}</label>
            </li>
            `
            }
        }

    }
    function bedInfoInit(data) {
        bedInfoWrap.innerHTML = ''
        for (const bedInfo in data) {
            bedInfoWrap.innerHTML +=
                `
            <li class="popup__content-item">
                <p>${data[bedInfo].title}</p>
                <span>${data[bedInfo].val}</span>
             </li>
        `
        }
    }

    function contentEdit() {
        filterElemWidth = -filterGap
        filterSelect.forEach(el => {
            filterElemWidth += el.offsetWidth + filterGap
        })

        if (getInfo.place == allInfo.place && getInfo.bedroom == allInfo.bedroom && getInfo.type == allInfo.type && getInfo.project == getInfo.project) {
            view360Btn.classList.add('hide')
        } else {
            view360Btn.classList.remove('hide')
        }
        dataSelect.forEach((select) => {
            switch (select.getAttribute('data-select')) {
                case "place":
                    select.innerHTML = `${wayToElem("place").title}`
                    break;
                case "bedroom":
                    select.innerHTML = `${wayToElem("bedroom").title}`
                    break;
                case "type":
                    select.innerHTML = `${wayToElem("type").title}`
                    break;
            }
        })
        dataInfo.forEach((info) => {
            switch (info.getAttribute('data-info')) {
                case "bedroom":
                    info.innerHTML = `${wayToElem("floor").bedTitle}`
                    break;
                case "type":
                    info.innerHTML = `${wayToElem("floor").typeTitle}`
                    break;
                case "price":
                    info.innerHTML = `
                <span>${wayToElem("floor").price.title}</span>
               <h2>${wayToElem("floor").price.val}</h2>
                            `
                    break;
            }
        })
        view360Btn.setAttribute("data-modal360", wayToElem("type").dataModal360)
        filterOption.forEach(el => {
            el.classList.remove('active')
        })
    }
    function viewInit(data) {
        if (data[allInfo.floor].blob) {
            media(data[allInfo.floor].blob)
        } else {
            preloaderFun()
            loadMedia({
                "2d": data[allInfo.floor]["2d"],
                "3d": data[allInfo.floor]["3d"]
            }).then((get) => {
                media(get)
                data[allInfo.floor].blob = get
            })
        }
        function media(get) {
            if (!data[allInfo.floor]["2d"] || !data[allInfo.floor]["3d"]) {
                viewSwitcher.classList.add('hide')
                if (!data[allInfo.floor]["2d"]) {
                    allInfo.viewMode = '3d'
                } else {
                    allInfo.viewMode = '2d'
                }
            } else {
                viewSwitcher.classList.remove('hide')
            }
            dataView.forEach(view => {

                if (view.getAttribute('data-view') == "2d") {
                    view.innerHTML =
                        `
                    <a href="${!get['2d'] ? '' : get['2d']}" data-fancybox='view-2d' class="popup__view-item" data-floor="${allInfo.floor}">
                       <img src="${!get['2d'] ? '' : get['2d']}" alt="">
                    </a>
                    `
                } else if (view.getAttribute('data-view') == "3d") {
                    view.innerHTML =
                        `
                <a href="${!get['3d'] ? '' : get["3d"]}" data-fancybox='view-3d' class="popup__view-item" data-floor="${allInfo.floor}">
                   <img src="${!get['3d'] ? '' : get["3d"]}" alt="">
                </a>
                `
                }
            })
        }


    }
    function contentInit() {
        placeInit(data)
        projectInit(wayToElem('place').projects)
        typeInit(wayToElem('bedroom').types)
        floorInit(wayToElem("type").floors)
        bedInfoInit(wayToElem("floor").bedInfo)
        viewInit(wayToElem("type").floors)
        switchView()
        contentEdit()
    }
    function onchange(e) {
        switch (e.target.getAttribute('name')) {
            case 'place':
                allInfo.place = e.target.value
                allInfo.project = data[allInfo.place].default
                allInfo.bedroom = wayToElem('project').default
                allInfo.type = wayToElem("bedroom").default
                allInfo.floor = wayToElem("type").curFloor
                contentInit()
                break
            case 'bedroom':
                allInfo.project = e.target.value.split(',')[1]
                allInfo.bedroom = e.target.value.split(',')[0]
                allInfo.type = wayToElem("bedroom").default
                allInfo.floor = wayToElem("type").curFloor
                contentInit()
                break;
            case "type":
                allInfo.type = e.target.value
                allInfo.floor = wayToElem("type").curFloor
                contentInit()
                break;
            case "floor":
                allInfo.floor = e.target.value
                contentInit()
                break;
            case "view-switch":
                allInfo.viewMode = e.target.value
                switchView()
                break;
        }
    }

    function preloaderFun() {
        const loader = popup.querySelector(".loader")
        loader.classList.remove('loaded')
        const loaderRing = popup.querySelector(".loader__progress-ring")
        const loaderStyle = window.getComputedStyle(loaderRing)
        const loaderCircle = popup.querySelector(".loader__progress-circle")
        loaderCircle.style.stroke = '#fff'
        loaderCircle.setAttribute('cx', parseInt(loaderStyle.width) / 2)
        loaderCircle.setAttribute('cy', parseInt(loaderStyle.width) / 2)
        loaderCircle.setAttribute('r', parseInt(loaderStyle.width) / 2 - 6)
        const radius = loaderCircle.getAttribute('r');
        const circumference = 2 * Math.PI * radius;
        loaderRing.style.strokeDasharray = `${circumference} ${circumference}`
        loaderRing.style.strokeDashoffset = circumference;
        function setProgress(percent) {
            const offset = circumference - ((percent * 100) / 100 * circumference)
            loaderRing.style.strokeDashoffset = offset;
        }
        window.addEventListener("floorplan-progress", (e) => {
            const progress = e.detail.totalProgress;
            setProgress(progress)
            if (progress === 1) {
                loader.classList.add('loaded')
            }
        });

    }

    return function (getData, dot) {
        if (!dot.isActive) {
            viewerBtnFloor.setAttribute('data-popup-default', '')
        } else {
            viewerBtnFloor.removeAttribute('data-popup-default')
            window.addEventListener('change', onchange)
            getInfo = dot
            allInfo = {
                ...getInfo,
                viewMode: "2d",
            }
            data = getData
            contentInit()
        }
    }
}

const popContent = getPopContentFn()
export { popContent }