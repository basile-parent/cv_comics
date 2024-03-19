const initCoverFlip = () => {
    document.querySelector("button#cover").addEventListener("click", () => {
        document.querySelector("button#cover .flip-card").classList.toggle("flipped")

        const isFlipped = document.querySelector("button#cover .flip-card").classList.contains("flipped")
        document.querySelector("button#cover .flip-card").setAttribute("aria-hidden", isFlipped + "")
        document.querySelector("button#cover").setAttribute("tabindex", isFlipped ? "-1" : "0")

        // Set the focus on the first clickable button
        document.querySelector("#categories button:first-of-type").focus()
    })
}

initCoverFlip()