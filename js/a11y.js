window.isReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true

function disableButtonIfReducedMotion(selector) {
    if (window.isReducedMotion) {
        const initialTitle = $(selector).attr("title")
        $(selector).attr("disabled", true)
            .attr("title", "Vos préférences systèmes bloquent les animations")
            .attr("data-initial-title", initialTitle)
    } else {
        const initialTitle = $(selector).attr("data-initial-title")
        $(selector).attr("disabled", false)
        if (initialTitle) {
            $(selector).attr("title", initialTitle)
            $(selector).removeAttr("data-initial-title")
        }
    }
}

function srSpeak(text, priority = "polite") {
    const el = document.createElement("div");
    const id = "speak-" + Date.now();
    el.setAttribute("id", id);
    el.setAttribute("aria-live", priority);
    el.classList.add("sr-only");
    document.body.appendChild(el);

    window.setTimeout(function () {
        document.getElementById(id).innerHTML = text;
    }, 100);

    window.setTimeout(function () {
        document.body.removeChild(document.getElementById(id));
    }, 1000);
}