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