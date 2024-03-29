let currentPageIndex = 0
let allPages = {}
let pageFlipCallbacks = [ initHints ]

function prevPage() {
    if ($(".active").hasClass("first")) {
        return;
    }

    prevPageFlip();
    vocalizePageTitle();

    afterFlipCb();
}

function nextPage() {
    if ($(".active").hasClass("last")) {
        return;
    }

    nextPageFlip();
    vocalizePageTitle();

    afterFlipCb();
}

function prevPageFlip() {
    $(".flipped")
        .last()
        .removeClass("flipped")
        .addClass("active")
        .siblings(".page")
        .removeClass("active");

    updateHash();
    afterFlipCb();

    currentPageIndex--
}


function nextPageFlip() {
    $(".active")
        .removeClass("active")
        .addClass("flipped")
        .next(".page")
        .addClass("active")
        .siblings();

    currentPageIndex++;
}

function afterFlipCb() {
    updateHash();
    pageFlipCallbacks.forEach(cbFn => cbFn(currentPageIndex))
    $("#cover-page").removeClass("animated").removeClass("hinted")
}

function updateHash() {
    window.location.hash = "#" + $(".active").attr("id")
}

async function goToHrefHashPage() {
    if (!window.location.hash) {
        return;
    }

    await goToPage(window.location.hash.substring(1));
}

function vocalizePageTitle(pageId = undefined) {
    let selector
    if (pageId) {
        selector = `#${ pageId } h1, #${ pageId } h2`
    } else {
        selector = ".active h1, .active h2"
    }
    $(selector).first().focus()
}

async function goToPage(pageId) {
    const askedPageIndex = allPages[pageId]?.index
    if (askedPageIndex === undefined) {
        console.warn("Trying to paginate to an unexisting page:", askedPageIndex)
        return;
    }
    const delta = askedPageIndex - currentPageIndex
    if (delta > 0) {
        vocalizePageTitle(pageId)
        while (askedPageIndex > currentPageIndex) {
            await timedPagination(nextPageFlip)
        }

        afterFlipCb();
    } else if (delta < 0) {
        vocalizePageTitle(pageId)
        while (askedPageIndex < currentPageIndex) {
            await timedPagination(prevPageFlip)
        }

        afterFlipCb();
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

initPageIndex();
goToHrefHashPage();