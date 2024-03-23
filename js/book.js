var currentPageIndex = 0
var allPages = {}

function prevPage() {
    console.log("prev")
    if ($(".active").hasClass("first")) {
        return;
    }

    prevPageFlip()
    vocalizePageTitle()
}

function nextPage() {
    if ($(".active").hasClass("last")) {
        return;
    }

    nextPageFlip()
    vocalizePageTitle()
}

function prevPageFlip() {
    $(".flipped")
        .last()
        .removeClass("flipped")
        .addClass("active")
        .siblings(".page")
        .removeClass("active");

    currentPageIndex--
}


function nextPageFlip() {
    $(".active")
        .removeClass("active")
        .addClass("flipped")
        .next(".page")
        .addClass("active")
        .siblings();

    currentPageIndex++
}

function vocalizePageTitle() {
    $(".active h1, .active h2").first().focus()
}

async function goToPage(pageId) {
    const pageIndex = allPages[pageId]?.index
    if (pageIndex === undefined) {
        console.warn("Trying to paginate to an unexisting page:", pageId)
        return;
    }
    const delta = pageIndex - currentPageIndex
    if (delta > 0) {
        while (currentPageIndex < pageIndex) {
            await timedPagination(nextPageFlip)
        }
        vocalizePageTitle()
    } else if (delta < 0) {
        while (currentPageIndex > pageIndex) {
            await timedPagination(prevPageFlip)
        }
        vocalizePageTitle()
    }
}

function timedPagination(paginationCb, timeout = 200) {
    return new Promise((resolve) => {
        setTimeout(() => {
            paginationCb()
            resolve()
        }, timeout)
    })
}

function initPageIndex() {
    $(".page").each((index, htmlElement) => {
        allPages[htmlElement.id] = { index }
    })
}

initPageIndex()

goToPage("presentation-page")

// function initPages() {
//     // $(".page").click((e) => {
//     //     if (e.currentTarget.classList.contains("active")) {
//     //         nextPage()
//     //     } else {
//     //         prevPage()
//     //     }
//     // })
//
//     // $("button#cover").click(() => {
//     //     console.log("click")
//     //     // $("button#cover .flip-card").toggleClass("flipped")
//     //     //
//     //     // const isFlipped = document.querySelector("button#cover .flip-card").classList.contains("flipped")
//     //     // $("button#cover .flip-card").attr("aria-hidden", isFlipped + "")
//     //     // $("button#cover").attr("tabindex", isFlipped ? "-1" : "0")
//     //     //
//     //     // // Set the focus on the first clickable button
//     //     // $("#summary-page button:first-of-type").trigger("focus")
//     //
//     //     nextPage()
//     // })
// }
//
// initPages()