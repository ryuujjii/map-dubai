
import { Fancybox } from "@fancyapps/ui";
export function popContent(data, dot) {
    const popup = document.querySelector('.popup')
    const viewerBtnFloor = document.querySelector('.viewer-btn-floorplan')
    const filter = popup.querySelector(".filter")
    const filterWrap = filter.querySelector(".filter__wrap")
    const placeWrap = popup.querySelector(".place__list")
    const projectWrap = popup.querySelector('.project')
    const floorWrap = popup.querySelector('.floor__list')
    const typeWrap = popup.querySelector('.type__list')
    const bedInfoWrap = popup.querySelector(".popup__content-list")
    const filterSelect = popup.querySelectorAll(".filter__select")
    const filterOption = filter.querySelectorAll(".filter__option")
    const dataSelect = popup.querySelectorAll("[data-select]")
    const dataInfo = popup.querySelectorAll("[data-info]")
    const dataView = popup.querySelectorAll("[data-view]")
    const viewSwitch = popup.querySelectorAll('[name="view-switch"]')
    const viewSwitcher = popup.querySelector('.popup__view-switcher')
    const viewFullBtn = popup.querySelectorAll('.view-fullbtn')
    const popFloors = popup.querySelector('.popup__floor')
    const view360Btn = popup.querySelector('.popup__view-360')

    //content
    if (!dot.isActive) {
        viewerBtnFloor.style.display = 'none'
    } else {
        viewerBtnFloor.style.display = 'block'
    }
    let filterElemWidth
    let getInfo = dot

    const allInfo = {
        ...getInfo,
        viewMode: "2d",

    }
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
            placeWrap.innerHTML +=
                `
            <li class="place__list-item">
               <input type="radio" value="${key}" ${key == allInfo.place ? 'checked' : ''} name="${data[key].name}" id="${data[key].name}-${i}" hidden>
               <label for="${data[key].name}-${i}">${data[key].title}</label>
            </li>
            `
        }
    }
    function projectInit(data) {
        projectWrap.innerHTML = ''
        let j = 0
        let bool = false
        for (const proj in data) {
            let bedrooms = ''
            for (const bed in data[proj].bedrooms) {
                if (bed == allInfo.bedroom && proj == allInfo.project) {
                    bool = true
                } else {
                    bool = false
                }
                j++
                bedrooms +=
                    `
                <li class="project__list-item">
                    <input type="radio" name="bedroom" value="${bed},${proj}"  ${bool ? 'checked' : ''} id="${data[proj].bedrooms[bed].name}-${j}" hidden>
                    <label for="${data[proj].bedrooms[bed].name}-${j}">${data[proj].bedrooms[bed].title}</label>
                </li>
                `
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
            typeWrap.innerHTML +=
                `
            <li class="type__list-item">
            <input type="radio" value="${type}" ${type == allInfo.type ? 'checked' : ''} name="${data[type].name}" id="${data[type].name}-${i}" hidden>
            <label for="${data[type].name}-${i}">${data[type].title}</label>
        </li>
            `
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

    function viewInit(data) {
        dataView.forEach(view => {
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
            if (view.getAttribute('data-view') == "2d") {
                view.innerHTML =
                    `
                    <a href="${data[allInfo.floor]["2d"]}" data-fancybox='view-2d' class="popup__view-item" data-floor="${allInfo.floor}">
                       <img src="${data[allInfo.floor]["2d"]}" alt="">
                    </a>
                    `
            } else if (view.getAttribute('data-view') == "3d") {
                view.innerHTML =
                    `
                <a href="${data[allInfo.floor]["3d"]}" data-fancybox='view-3d' class="popup__view-item" data-floor="${allInfo.floor}">
                   <img src="${data[allInfo.floor]["3d"]}" alt="">
                </a>
                `
            }
        })

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
    window.addEventListener('change', (e) => {
        switch (e.target.getAttribute('name')) {
            case 'place':
                allInfo.place = e.target.value
                allInfo.project = data[allInfo.place].default
                allInfo.bedroom = data[allInfo.place].projects[allInfo.project].default
                allInfo.type = data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].default
                allInfo.floor = data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].curFloor
                contentInit(allInfo.place, allInfo.project, allInfo.bedroom, allInfo.type)
                break
            case 'bedroom':
                allInfo.project = e.target.value.split(',')[1]
                allInfo.bedroom = e.target.value.split(',')[0]
                allInfo.type = data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].default
                allInfo.floor = data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].curFloor
                contentInit(allInfo.place, allInfo.project, allInfo.bedroom, allInfo.type)
                break;
            case "type":
                allInfo.type = e.target.value
                allInfo.floor = data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].curFloor
                contentInit(allInfo.place, allInfo.project, allInfo.bedroom, allInfo.type)
                break;
            case "floor":
                allInfo.floor = e.target.value
                contentInit(allInfo.place, allInfo.project, allInfo.bedroom, allInfo.type)
                break;
            case "view-switch":
                allInfo.viewMode = e.target.value
                switchView()
                break;
        }
    })
    function contentEdit() {
        dataSelect.forEach((select) => {
            switch (select.getAttribute('data-select')) {
                case "place":
                    select.innerHTML = `${data[allInfo.place].title}`
                    break;
                case "bedroom":
                    select.innerHTML = `${data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].title}`
                    break;
                case "type":
                    select.innerHTML = `${data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].title}`
                    break;
            }
        })
        dataInfo.forEach((info) => {
            switch (info.getAttribute('data-info')) {
                case "bedroom":
                    info.innerHTML = `${data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].floors[allInfo.floor].bedTitle}`
                    break;
                case "type":
                    info.innerHTML = `${data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].floors[allInfo.floor].typeTitle}`
                    break;
                case "price":
                    info.innerHTML = `
                    <span>${data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].floors[allInfo.floor].price.title}</span>
                   <h2>${data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].floors[allInfo.floor].price.val}</h2>
                                `
                    break;
            }
        })
        view360Btn.setAttribute("data-modal360", data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].dataModal360)
        filterOption.forEach(el => {
            el.classList.remove('active')
        })
    } 
    function contentInit(place, project, bedroom, type) {
        placeInit(data)
        projectInit(data[place].projects)
        typeInit(data[place].projects[project].bedrooms[bedroom].types)
        floorInit(data[place].projects[project].bedrooms[bedroom].types[type].floors)
        bedInfoInit(data[place].projects[project].bedrooms[bedroom].types[type].floors[allInfo.floor].bedInfo)
        viewInit(data[place].projects[project].bedrooms[bedroom].types[type].floors)
        switchView()
        contentEdit()


    }
    contentInit(allInfo.place, allInfo.project, allInfo.bedroom, allInfo.type)
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




}
