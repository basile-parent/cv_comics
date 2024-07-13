const SKILL_GAUGE_COUNT = 5

function initSkillsGauges() {
    const skillStep = 10 / SKILL_GAUGE_COUNT
    console.log("skillStep", skillStep)

    $(".skill-gauge").each((index, element) => {
        const levelOnTen = +$(element).attr("data-level")
        if (!levelOnTen) {
            return
        }
        for (let i = 0; i < SKILL_GAUGE_COUNT; i++) {
            if (levelOnTen >= (i+1) * skillStep) {
                $(element).append(`<span class="skill-gauge-full"></span>`)
            } else {
                $(element).append(`<span class="skill-gauge-empty"></span>`)
            }
        }
    })
}

function initExperiencesDisclosures() {
    $("#skills-page #experiences-details dt button").click((e) => {
        $(e.currentTarget).attr("aria-expanded", $(e.currentTarget).attr("aria-expanded") !== "true" + "")
    })
}

initSkillsGauges()
initExperiencesDisclosures()