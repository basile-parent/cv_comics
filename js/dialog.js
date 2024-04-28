function openDialog(dialogId, elementSelectorToFocusOnClose) {
    const dialog = $(`.dialog-container#${ dialogId }`)
    dialog.removeAttr("inert")

    dialog.find("button, a, input, textarea, [tabindex=0]").focus()

    dialog.children(".dialog").first()
        .append(`<input type="hidden" class="elementSelectorToFocusOnClose" value="${ elementSelectorToFocusOnClose }"/>`)

    window.addEventListener("keydown", closeDialogOnEsc)

    $("main").attr("inert", "")
}
function closeDialog() {
    const dialog = $(".dialog-container:not([inert])")

    $("main").removeAttr("inert")

    const elementSelectorInput = dialog.find(".elementSelectorToFocusOnClose")[0]
    const elementSelectorToFocusOnClose = elementSelectorInput.value

    window.removeEventListener("keydown", closeDialogOnEsc)

    dialog.addClass("closing")
    setTimeout(() => {
        dialog.attr("inert", "").removeClass("closing")
        $(elementSelectorToFocusOnClose).focus()
        elementSelectorInput.remove()
    }, 300)
}

function closeDialogOnEsc(event) {
    if (event.key === "Escape") {
        closeDialog()
    }
}