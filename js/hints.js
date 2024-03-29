const HINT_INTERVAL = 3000;
const MAX_PANEL_INDEX = 6;
const SUMMARY_PAGE_INDEX = 1;

let hintDisabled = false;
let hintInterval;
let currentPanelHintIndex = 1;

const initHints = (currentPageIndex) => {
    if (hintDisabled || currentPageIndex !== SUMMARY_PAGE_INDEX) {
        cleanHints()
        return;
    }

    hintInterval = setInterval(() => {
        showHint(currentPanelHintIndex)

        currentPanelHintIndex = (currentPanelHintIndex + 1) % (MAX_PANEL_INDEX + 1)
    }, HINT_INTERVAL);

    $("#summary-page .panel").click(cleanHints).hover(cleanHints)
    $("#summary-page .panel button").on("focus", cleanHints)

    setTimeout(() => {
        $("#summary-page #presentation .bubble").addClass("hint")
    }, HINT_INTERVAL / 1.5)
}

const cleanHints = () => {
    clearInterval(hintInterval);
    $("#summary-page #presentation .bubble").removeClass("hint");
    hintDisabled = true;
}

const showHint = (categoryIndex) => {
    const categoryItem = $(`#summary-page .categories > li:nth-of-type(${ categoryIndex })`).first();
    categoryItem.addClass("hover")
    setTimeout(() => {
        categoryItem.removeClass("hover")
    }, 1000)
}
