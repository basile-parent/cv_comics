const initCoverFlip = () => {
    $("button#cover").click(() => {
        $("button#cover .flip-card").toggleClass("flipped")

        const isFlipped = document.querySelector("button#cover .flip-card").classList.contains("flipped")
        $("button#cover .flip-card").attr("aria-hidden", isFlipped + "")
        $("button#cover").attr("tabindex", isFlipped ? "-1" : "0")

        // Set the focus on the first clickable button
        $("#categories button:first-of-type").trigger("focus")
    })
}

initCoverFlip()