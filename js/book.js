function prevPage() {
    $(".flipped")
        .last()
        .removeClass("flipped")
        .addClass("active")
        .siblings(".page")
        .removeClass("active");
}

function nextPage() {
    $(".active")
        .removeClass("active")
        .addClass("flipped")
        .next(".page")
        .addClass("active")
        .siblings();
}

function initPages() {
    $(".page").click((e) => {
        if (e.currentTarget.classList.contains("active")) {
            nextPage()
        } else {
            prevPage()
        }
        console.log(e)
    })
}

initPages()