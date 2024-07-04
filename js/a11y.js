window.isReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true

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

function initA11yParameters() {
    if (window.isReducedMotion || localStorage.getItem("disable-animations")) {
        disableAnimations()
    } else {
        enableAnimations()
    }

    $(`input[name="control-animation"][value="disabled"]`).click(disableAnimations)
    $(`input[name="control-animation"][value="enabled"]`).click(enableAnimations)
}

function disableAnimations() {
    $(`input[name="control-animation"]`).prop("checked", false)
    $(`input[name="control-animation"][value="disabled"]`).prop("checked", true)
    localStorage.setItem("disable-animations", "true")

    $("body").addClass("disable-animation")
}
function enableAnimations() {
    $(`input[name="control-animation"]`).prop("checked", false)
    $(`input[name="control-animation"][value="enabled"]`).prop("checked", true)
    localStorage.removeItem("disable-animations")
    $("body").removeClass("disable-animation")
}

initA11yParameters()