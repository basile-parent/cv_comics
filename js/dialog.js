function openDialog(dialogId, elementSelectorToFocusOnClose) {
    const dialog = $(`.dialog-container#${ dialogId }`)
    dialog.removeAttr("inert")
    dialog.on("click", closeDialog)

    dialog.find("button, a, input, textarea, [tabindex=0]").first().focus()

    const dialogPanel = dialog.children(".dialog").first()
    dialogPanel.append(`<input type="hidden" class="elementSelectorToFocusOnClose" value="${ elementSelectorToFocusOnClose }"/>`)
    dialogPanel.on("click", stopDialogPropagation)

    window.addEventListener("keydown", closeDialogOnEsc)

    $("main, .dialog-button, #skip-links").attr("inert", "")
}
function closeDialog() {
    const dialog = $(".dialog-container:not([inert])")

    $("main, .dialog-button, #skip-links").removeAttr("inert")

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

function stopDialogPropagation(event) {
    event.stopPropagation()
}