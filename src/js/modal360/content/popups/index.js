
export function popContent(data, dot) {
    const popup = document.querySelector('.popup')
    const viewerBtnFloor = document.querySelector('.viewer-btn-floorplan')
    const filter = popup.querySelector(".filter")
    const filterWrap = filter.querySelector(".filter__wrap")
    const placeWrap = popup.querySelector(".place__list")
    const projectWrap = popup.querySelector('.project')
    const typeWrap = popup.querySelector('.type__list')
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
        viewMode: "2d"
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
            console.log(type);
            typeWrap.innerHTML +=
                `
            <li class="type__list-item">
            <input type="radio" ${type == allInfo.type ? 'checked' : ''} name="${data[type].name}" id="${data[type].name}-${i}" hidden>
            <label for="${data[type].name}-${i}">${data[type].title}</label>
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
                contentInit(allInfo.place, allInfo.project, allInfo.bedroom)
                break
            case 'bedroom':
                allInfo.project = e.target.value.split(',')[1]
                allInfo.bedroom = e.target.value.split(',')[0]
                contentInit(allInfo.place, allInfo.project, allInfo.bedroom)
                break;
        }
    })


    function contentInit(place, project, bedroom) {
        placeInit(data)
        projectInit(data[place].projects)
        typeInit(data[place].projects[project].bedrooms[bedroom].types)
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
