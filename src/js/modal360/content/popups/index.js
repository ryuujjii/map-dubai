
export function popContent(data) {
    const popup = document.querySelector('.popup')
    const placeCheck = popup.querySelector('[data-place-check]')
    const filterType = popup.querySelector('.filter__type')
    const bedroomCheck = popup.querySelector('[data-bedroom-check]')
    const typeCheck = popup.querySelector('[data-type-check]')
    const placeHold = popup.querySelector('[data-place-list]')
    const bedroomHold = popup.querySelector('[data-bedroom-list]')
    const typeHold = popup.querySelector('[data-type-list]')
    const viewSwitcher = popup.querySelectorAll('[name="view-switch"]')

    //content
    const dataModel = document.querySelector(".popup__view-model")
    const dataImg = document.querySelector(".popup__view-img")
    const dataInfo = popup.querySelectorAll("[data-info]")
    const getInfo = {
        place: 'Water',
        bedroom: '1-bed',
        type: 'typeA',
    }
    const allInfo = {
        place: getInfo.place,
        bedroom: getInfo.bedroom,
        type: getInfo.type,
        viewMode: "3d"
    }
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
            if(allInfo.viewMode == '2d'){
                dataImg.classList.add('active')
                dataModel.classList.remove('active')
            }else{
                dataImg.classList.remove('active')
                dataModel.classList.add('active')
            }
            // initContent(allInfo.place, allInfo.bedroom, allInfo.type, allInfo.viewMode)
        }
    })
    function placesInfo(data, place) {
        placeCheck.innerHTML = data[place].title
        checkList(placeHold, data, place)
    }
    function bedroomsInfo(bedroomList, bedroom) {
        bedroomCheck.innerHTML = bedroomList[bedroom].title
        checkList(bedroomHold, bedroomList, bedroom)
    }
    function typeInfo(typeList, type) {
            typeCheck.innerHTML = typeList[type].title
            checkList(typeHold, typeList, type)
    }
    function viewModeFun(place, bedroom, type) {
            return `
            <model-viewer class="pop-model-viewer" loading="eager" max-camera-orbit="auto 95deg auto" src="${data[place].bedrooms[bedroom].types[type]['3d']}" ar="" ar-modes="webxr scene-viewer quick-look" camera-controls="" tone-mapping="commerce" shadow-intensity="1" disable-pan="" disable-zoom="" ar-status="not-presenting">
                        <button slot="ar-button" class="ar-button" id="ar-button">
                           
                            Watch in <span>AR</span>
                        </button>
                    </model-viewer>
                    <div class="loader">
                          <div class="loader__progress">
                            <span>Loading</span>
                            <svg class="loader__progress-ring" width="500" height="500">
            <circle class="loader__progress-circle" stroke-width="4" cx="250" cy="250" r="246" fill="transparent" />
          </svg>

                          </div>
                     </div>
                    `
    }

    function preloaderFun() {
        const modelViewer = popup.querySelector(".pop-model-viewer")
        const loader = popup.querySelector(".loader")
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
        modelViewer.addEventListener("progress", (e) => {
            const progress = e.detail.totalProgress;
            setProgress(progress)
            if (progress === 1) {
                loader.classList.add('loaded')
            }
        });

    }
    function checkList(selector, list, el) {
        let idx = 0
        selector.innerHTML = ""
        for (const key in list) {
            idx++
            selector.innerHTML += `
            <li class="filter__list-item">
            <input class="filter__list-inp"  type="radio" ${el == key ? 'checked' : ''}  value="${key}" name="${list[key].name}" id="${list[el].name}-${idx}" hidden>
            <label class="filter__list-lab" for="${list[el].name}-${idx}" >
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
        viewSwitcher.forEach(view => {
            if (view.value == "3d") {
                view.checked = true
                dataImg.classList.remove('active')
                dataModel.classList.add('active')
            }
        })
        let typeObjs = Object.keys(data[allInfo.place].bedrooms[allInfo.bedroom].types)
        console.log(typeObjs);
        if(typeObjs.length ==1 && typeObjs[0]!="default"){
            filterType.classList.add('alone')
            filterType.classList.remove("no-type")
        }else {
            if(typeObjs[0]=="default"){
                filterType.classList.add("no-type")
                filterType.classList.remove('alone')
            }else{
                filterType.classList.remove("no-type")
                filterType.classList.remove('alone')
            }
           
        }
        //content
        dataInfo.forEach(info => {
            switch (info.getAttribute("data-info")) {
                case "badroom":
                    info.innerHTML = data[place].bedrooms[bedroom].title
                    break;
                case "type":
                    info.innerHTML = data[place].bedrooms[bedroom].types[type].title
                    break;
                case "bathrooms":
                    info.innerHTML = data[place].bedrooms[bedroom].types[type].bathrooms
                    break;
                case "totalArea":
                    info.innerHTML = data[place].bedrooms[bedroom].types[type].totalArea
                    break;
                case "price":
                    info.innerHTML = data[place].bedrooms[bedroom].types[type].price
                    break;
                case "img":
                    info.innerHTML = `<img src="${data[place].bedrooms[bedroom].types[type]['2d']}"/>`
                    break;
                case "model":
                    info.innerHTML = viewModeFun(place, bedroom, type)
                    preloaderFun()
                    break;
            }
        });
    }
    initContent(allInfo.place, allInfo.bedroom, allInfo.type)



}
