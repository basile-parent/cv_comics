function initSkillsDisclosures() {
    $("#skills-page #experiences-details dt button").click((e) => {
        $(e.currentTarget).attr("aria-expanded", $(e.currentTarget).attr("aria-expanded") !== "true" + "")
    })
}

initSkillsDisclosures()