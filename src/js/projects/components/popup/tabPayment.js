export default function tabPatment() {
    const tabLinks = document.querySelectorAll(".payment__nav-link");
    const tabContents = document.querySelectorAll(".payment__tab-pane");

    tabLinks.forEach(btn => {
        btn.addEventListener("click", () => {

            tabLinks.forEach(btn => {
                btn.classList.remove("active")
            })

            tabContents.forEach(content => {
                content.classList.remove("active")
            })

            btn.classList.add("active");

            const tabId = btn.getAttribute("data-tab")

            document.querySelector(`.payment__tab-pane[id="${tabId}"]`).classList.add("active");
        })
    })

    const scrollContent = document.querySelector('.payment__nav-container');
    const paymentWrapperNav = document.querySelector('.payment__nav-wrapper')
    const paymentNextBtn = document.querySelector('.payment__nav-button-next')
    const paymentPrevBtn = document.querySelector('.payment__nav-button-prev')

    const scrollStep = 80;
    paymentWrapperNav.classList.add('scroll-right')
    paymentPrevBtn.classList.add('disabled')


    paymentPrevBtn.addEventListener('click', () => {
        gsap.to(scrollContent, {
            duration: 0.5,
            scrollTo: { x: '-=' + scrollStep },
        });
    });


    paymentNextBtn.addEventListener('click', (e) => {
        gsap.to(scrollContent, {
            duration: 0.5,
            scrollTo: { x: '+=' + scrollStep },
        });
    });


    scrollContent.addEventListener('scroll', () => {
        const scrollLeft = scrollContent.scrollLeft;
        
        if(scrollLeft >= 10) {
            paymentWrapperNav.classList.add('scroll-left')
            paymentPrevBtn.classList.remove('disabled')
        }

        if(scrollLeft < 10) {
            paymentWrapperNav.classList.remove('scroll-left')
            paymentPrevBtn.classList.add('disabled')
        }

        if(scrollLeft >= 100) {
            paymentWrapperNav.classList.remove('scroll-right')
            paymentNextBtn.classList.add('disabled')
        }

        if(scrollLeft < 100) {
            paymentWrapperNav.classList.add('scroll-right')
            paymentNextBtn.classList.remove('disabled')
        }
    });

}