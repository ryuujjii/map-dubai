
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
    const dataSelect = popup.querySelectorAll("[data-select]")
    const dataInfo = popup.querySelectorAll("[data-info]")
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
        floor: "0"
    }
    function placeInit(data) {
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
            <span class="project__item-name">${data[proj].title}</span>
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
    window.addEventListener('change', (e) => {
        switch (e.target.getAttribute('name')) {
            case 'place':
                allInfo.place = e.target.value
                allInfo.project = data[allInfo.place].default
                allInfo.bedroom = data[allInfo.place].projects[allInfo.project].default
                allInfo.type = data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].default
                contentInit(allInfo.place, allInfo.project, allInfo.bedroom, allInfo.type)
                break
            case 'bedroom':
                allInfo.project = e.target.value.split(',')[1]
                allInfo.bedroom = e.target.value.split(',')[0]
                allInfo.type = data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].default
                contentInit(allInfo.place, allInfo.project, allInfo.bedroom, allInfo.type)
                break;
            case "type":
                allInfo.type = e.target.value
                contentInit(allInfo.place, allInfo.project, allInfo.bedroom, allInfo.type)
                break;
            case "floor":
                allInfo.floor = e.target.value
                contentInit(allInfo.place, allInfo.project, allInfo.bedroom, allInfo.type)
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
        dataInfo.forEach((info)=>{
            switch (info.getAttribute('data-info')) {
                case "bedroom":
                    info.innerHTML = `${data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].title}`
                    break;
                case "type":
                    info.innerHTML = `${data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].title}`
                    break;
                case "price":
                    info.innerHTML =`
                    <span>${data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].price.title}</span>
                   <h2>${data[allInfo.place].projects[allInfo.project].bedrooms[allInfo.bedroom].types[allInfo.type].price.val}</h2>
                                `
                    break;
            }
        })
    }
    function contentInit(place, project, bedroom, type) {
        placeInit(data)
        projectInit(data[place].projects)
        typeInit(data[place].projects[project].bedrooms[bedroom].types)
        floorInit(data[place].projects[project].bedrooms[bedroom].types[type].floors)
        bedInfoInit(data[place].projects[project].bedrooms[bedroom].types[type].bedInfo)
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
