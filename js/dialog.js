function openDialog(dialogId, elementSelectorToFocusOnClose) {
    const dialog = $(`.dialog-container#${ dialogId }`)
    dialog.removeAttr("inert")

    dialog.find("button, a, input, textarea, [tabindex=0]").focus()

    dialog.children(".dialog").first()
        .append(`<input type="hidden" class="elementSelectorToFocusOnClose" value="${ elementSelectorToFocusOnClose }"/>`)

    $("main").attr("inert", "")
}
function closeDialog(button) {
    const dialog = $(button).parents(".dialog-container");

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