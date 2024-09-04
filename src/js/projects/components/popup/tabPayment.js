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
}