function openDialog(dialogId, elementSelectorToFocusOnClose) {
    const dialog = $(`[role=dialog]#${ dialogId }`)
    dialog.removeAttr("inert")

    dialog.find("button, a, input, textarea, [tabindex=0]").focus()

    dialog.children(".dialog-container").first()
        .append(`<input type="hidden" class="elementSelectorToFocusOnClose" value="${ elementSelectorToFocusOnClose }"/>`)

    $("main").attr("inert", "")
}
function closeDialog(button) {
    const dialog = $(button).parents("[role=dialog]");

    $("main").removeAttr("inert")

    const elementSelectorInput = dialog.find(".elementSelectorToFocusOnClose")[0];
    const elementSelectorToFocusOnClose = elementSelectorInput.value

    dialog.addClass("closing")
    setTimeout(() => {
        dialog.attr("inert", "").removeClass("closing")
        $(elementSelectorToFocusOnClose).focus()
        elementSelectorInput.remove()
    }, 300)
}