const ANIMATION_TIME = 13000;
let animationTimeout;

function initControlButton() {
    $("#control-animation").click(() => {
        if ($("#control-animation").hasClass("stop")) {
            showInerteCover()
        } else if ($("#control-animation").hasClass("reload")) {
            showAnimatedCover()
        }
    })
}

function showAnimatedCover() {
    $("#cv-book #cover-page").removeClass("animated")
    $("#cv-book #cover-page").addClass("animated")
    $("#control-animation").addClass("stop").removeClass("reload")
    $("#control-animation span").html("Arrêter l'animation")

    $("#cover-page a")
        .attr("disabled", true)
        .attr("aria-disabled", true)
        .attr("aria-label", "Aller au sommaire - Lien désactivé pendant l'animation (environ 15 secondes)")
        .attr("title", "Aller au sommaire - Lien désactivé pendant l'animation (environ 15 secondes)")

    showCv()

    animationTimeout = setTimeout(() => {
        showInerteCover()
        srSpeak("Animation de la couverture terminée")
    }, ANIMATION_TIME)
}

function showInerteCover() {
    disableCoverAnimation()
    showCv()
    clearTimeout(animationTimeout)
}

function disableCoverAnimation() {
    $("#cv-book #cover-page").removeClass("animated")
    $("#control-animation").addClass("reload").removeClass("stop")
    $("#control-animation span").html("Relancer l'animation")

    $("#cover-page a")
        .removeAttr("disabled")
        .removeAttr("aria-disabled")
        .removeAttr("title")
        .attr("aria-label", "Aller au sommaire")
}

function passAnimationSelectionPage() {
    $("#cv-book").removeAttr("aria-hidden")
    $("#intro-book").attr("aria-hidden", "true")
}

function showCv() {
    passAnimationSelectionPage()
    $("#cv-book h1").focus()
}

initControlButton()