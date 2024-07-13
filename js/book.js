let currentPageIndex = 0
let allPages = {}
let pageFlipBeforeCallbacks = [ passAnimationSelectionPage ]
let pageFlipCallbacks = [ initHints, updateSkipLinksWithPageBook ]

function disableSummaryLinkOnAnimation(e) {
    if ($("#cover-page").hasClass("animated")) {
        e.preventDefault()
    }
}

function initBook() {
    $("#cv-book .page").each((index, htmlElement) => {
        allPages[htmlElement.id] = { index }
    })

    goToHrefHashPage({ disableVocalize: true })

    beforeFlipCb()

    nextPageFlip()

    afterFlipCb()

    window.addEventListener("popstate", function (event) {
        goToHrefHashPage()
    })

    $("a, button, [tabindex=0], input, textarea, select").on("focus", (e) => {
        flipIfFocusIsOnHiddenElement(e.currentTarget)
    })
}

async function goToHrefHashPage(options = undefined) {
    const hash = window.location.hash?.substring(1)

    if (!hash) {
        return
    }

    await goToPage(hash, options)
}

// For keyboard navigation only
function flipIfFocusIsOnHiddenElement(element) {
    const containerPage = $(element).parents(".page");
    if (!containerPage.hasClass("active")) {
        goToPage(containerPage.attr("id"), { disableVocalize: true })
    }
}

async function goToPage(pageId, options = undefined) {
    const askedPageIndex = allPages[pageId]?.index
    if (askedPageIndex === undefined) {
        console.warn("Trying to paginate to an unexisting page:", askedPageIndex)
        return;
    }

    !options?.disableVocalize && vocalizePageTitle(pageId)

    const delta = askedPageIndex - currentPageIndex

    if (delta > 0) {
        beforeFlipCb()

        while (askedPageIndex > currentPageIndex) {
            await timedPagination(nextPageFlip)
        }

        afterFlipCb();
    } else if (delta < 0) {
        beforeFlipCb()

        while (askedPageIndex < currentPageIndex) {
            await timedPagination(prevPageFlip)
        }

        afterFlipCb();
    }
}

function prevPageFlip() {
    $(".page.flipped")
        .last()
        .removeClass("flipped")
        .addClass("active")
        .siblings(".page")
        .removeClass("active")

    currentPageIndex--
}


function nextPageFlip() {
    $(".page.active")
        .removeClass("active")
        .addClass("flipped")
        .next(".page")
        .addClass("active")

    currentPageIndex++
}

function beforeFlipCb() {
    $("html, body").addClass("noScroll")
    pageFlipBeforeCallbacks.forEach(cbFn => cbFn(currentPageIndex))
}

function afterFlipCb() {
    pageFlipCallbacks.forEach(cbFn => cbFn(currentPageIndex))
    $("#cover-page").removeClass("animated").removeClass("hinted")
    // Wait for the page to end flipping
    setTimeout(() => {
        $("html, body").removeClass("noScroll")
    }, 1000)
}

function vocalizePageTitle(pageId) {
    $(`#${ pageId } h1, #${ pageId } h2`).first().focus()
}


function timedPagination(paginationCb, timeout = 200) {
    return new Promise((resolve) => {
        setTimeout(() => {
            paginationCb()
            resolve()
        }, timeout)
    })
}

initBook();
