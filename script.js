const $dailyClock = document.getElementById("daily-clock");
const $dailyHand = document.getElementById("daily-hand");
const $dailyClockHourDisplay = document.getElementById(
    "daily-clock-hour-display"
);

const $monthlyClock = document.getElementById("monthly-clock");
const $monthlyHand = document.getElementById("monthly-hand");
const $monthlyHourDisplay = document.getElementById("monthly-hour-display");
const $category = document.querySelectorAll(".category");
const $dailySelectOption = document.getElementById("daily-select-option");
const $dailyIconClose = document.getElementById("daily-icon-close");

const $monthlySelectOption = document.getElementById("monthly-select-option");
const $monthlyClose = document.getElementById("monthly-close");
const $dailyOptionsAgenda = document.querySelectorAll(".daily-options-agenda");
const $dailyScheduled = document.querySelectorAll(".daily-scheduled");

samePlaceResetHandHour();
addElementsListAgenda();
lastClickOptionAgenda();
SelectedHandMovAgenda();
dailyClock($dailyClock, $dailyHand, $dailyClockHourDisplay);
agendaElementSelect();
clickDailyOptionsMoveHandHour();

let dailyHours = 0;

function dailyClock(clock, hand, hourDisplay) {
    let isDragging = false;
    let totalRotations = 0;
    let lastAngle = 0;

    clock.addEventListener("mousedown", () => (isDragging = true));
    -0;

    document.addEventListener("mouseup", () => (isDragging = false));

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const rect = clock.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;

        if (lastAngle > 270 && angle < 90) {
            totalRotations++;
        } else if (lastAngle < 90 && angle > 270) {
            if (totalRotations === 0) {
                angle = 0;
            } else {
                totalRotations--;
            }
        }
        lastAngle = angle;

        let totalHours = Math.round((angle / 360 + totalRotations) * 12);
        hand.style.transform = `translateX(-50%) rotate(${
            angle + totalRotations * 360
        }deg)`;
        hourDisplay.textContent = `${totalHours}h`;
        dailyHours = totalHours;
    });
}

$category[0].addEventListener("click", dailyShowList);
$dailyIconClose.addEventListener("click", dailyCloseUl);

function dailyShowList() {
    $category[0].style.display = "none";
    $dailySelectOption.style.display = "block";
}
function dailyCloseUl() {
    $category[0].style.display = "flex";
    $dailySelectOption.style.display = "none";
}

$category[1].addEventListener("click", weeklyShowList);
$weeklyClose.addEventListener("click", weeklyCloseUl);

function weeklyShowList() {
    $weeklySelectOption.style.display = "block";
    $category.style.display = "none";
}
function weeklyCloseUl() {
    $weeklySelectOption.style.display = "none";
    $category.style.display = "flex";
}

$category[2].addEventListener("click", monthlyShowList);
$monthlyClose.addEventListener("click", monthlyCloseUl);

function monthlyShowList() {
    $category[2].style.display = "none";
    $monthlySelectOption.style.display = "block";
}
function monthlyCloseUl() {
    $category[2].style.display = "flex";
    $monthlySelectOption.style.display = "none";
}

let incDiv = 0;
let ultimoClicado = null;

function lastClickOptionAgenda() {
    $dailyOptionsAgenda.forEach((element) => {
        element.addEventListener("click", () => {
            $dailyScheduled.forEach((b) => b.classList.remove("selected"));
            ultimoClicado = element;
        });
    });
}

function addElementsListAgenda() {
    $dailyOptionsAgenda.forEach((element) => {
        element.addEventListener("click", () => {
            const dailyScheduledHourWork = document.getElementById(
                "daily-scheduled-hour-work"
            );
            const dailyScheduledHourPlay = document.getElementById(
                "daily-scheduled-hour-play"
            );
            const dailyScheduledHourStudy = document.getElementById(
                "daily-scheduled-hour-study"
            );
            const dailyScheduledHourExercise = document.getElementById(
                "daily-scheduled-hour-exercise"
            );
            const dailyScheduledHourSocial = document.getElementById(
                "daily-scheduled-hour-social"
            );
            const dailyScheduledHourSelfCare = document.getElementById(
                "daily-scheduled-hour-self-care"
            );

            // Reset hours
            $dailyClockHourDisplay.textContent = "0h";
            $dailyHand.style.transform = "translateX(-50%) rotate(0deg)";
            if (incDiv < $dailyScheduled.length) {
                if (element.innerText === "Work") {
                    //
                    if (dailyScheduledHourWork !== null) {
                        $dailyClockHourDisplay.innerText =
                            dailyScheduledHourWork.innerText;
                        $dailyHand.style.transform = dataHandHourStyleWork;
                    }
                    //
                    if (element.classList.contains("selected")) {
                        $dailyScheduled[incDiv].style.backgroundColor = "#ccc";
                        $dailyScheduled[incDiv].innerHTML = "";
                        return;
                    }
                    element.classList.add("selected");
                    //
                    $dailyScheduled[incDiv].style.backgroundColor = "#ff8b64";
                    $dailyScheduled[incDiv].setAttribute("data-id", "work");
                    $dailyScheduled[incDiv].innerHTML = `
                    <p class="p-hours" id="p-hours-work">${element.textContent} <span class="span-hours" id="daily-scheduled-hour-work"> ${$dailyClockHourDisplay.textContent}</span></p>  
                    `;
                    incDiv++;
                }
                if (element.innerText === "Play") {
                    if (dailyScheduledHourPlay !== null) {
                        $dailyClockHourDisplay.innerText =
                            dailyScheduledHourPlay.innerText;
                        $dailyHand.style.transform = dataHandHourStylePlay;
                    }
                    if (element.classList.contains("selected")) {
                        $dailyScheduled[incDiv].style.backgroundColor = "#ccc";
                        $dailyScheduled[incDiv].innerHTML = "";
                        return;
                    }
                    element.classList.add("selected");
                    $dailyScheduled[incDiv].style.backgroundColor = "#55c2e6";
                    $dailyScheduled[incDiv].setAttribute("data-id", "play");
                    $dailyScheduled[incDiv].innerHTML = `
                    <p class="p-hours" id="p-hours-play">${element.textContent} <span class="span-hours" id="daily-scheduled-hour-play"> ${$dailyClockHourDisplay.textContent}</span></p>  
                    `;
                    incDiv++;
                }

                if (element.innerText === "Study") {
                    if (dailyScheduledHourStudy !== null) {
                        $dailyClockHourDisplay.innerText =
                            dailyScheduledHourStudy.innerText;
                        $dailyHand.style.transform = dataHandHourStyleStudy;
                    }
                    if (element.classList.contains("selected")) {
                        $dailyScheduled[incDiv].style.backgroundColor = "#ccc";
                        $dailyScheduled[incDiv].innerHTML = "";
                        return;
                    }
                    element.classList.add("selected");
                    $dailyScheduled[incDiv].style.backgroundColor = "#ff5e7d";
                    $dailyScheduled[incDiv].setAttribute("data-id", "study");
                    $dailyScheduled[incDiv].innerHTML = `
                    <p class="p-hours" id="p-hours-study">${element.textContent} <span class="span-hours" id="daily-scheduled-hour-study"> ${$dailyClockHourDisplay.textContent}</span></p>  
                    `;
                    incDiv++;
                }

                if (element.innerText === "Exercise") {
                    if (dailyScheduledHourExercise !== null) {
                        $dailyClockHourDisplay.innerText =
                            dailyScheduledHourExercise.innerText;
                        $dailyHand.style.transform = dataHandHourStyleExercise;
                    }
                    if (element.classList.contains("selected")) {
                        $dailyScheduled[incDiv].style.backgroundColor = "#ccc";
                        $dailyScheduled[incDiv].innerHTML = "";
                        return;
                    }
                    element.classList.add("selected");
                    $dailyScheduled[incDiv].style.backgroundColor = "#4bcf82";
                    $dailyScheduled[incDiv].setAttribute("data-id", "exercise");
                    $dailyScheduled[incDiv].innerHTML = `
                    <p class="p-hours" id="p-hours-exercise">${element.textContent} <span class="span-hours" id="daily-scheduled-hour-exercise"> ${$dailyClockHourDisplay.textContent}</span></p>  
                    `;
                    incDiv++;
                }

                if (element.innerText === "Social") {
                    if (dailyScheduledHourSocial !== null) {
                        $dailyClockHourDisplay.innerText =
                            dailyScheduledHourSocial.innerText;
                        $dailyHand.style.transform = dataHandHourStyleSocial;
                    }
                    if (element.classList.contains("selected")) {
                        $dailyScheduled[incDiv].style.backgroundColor = "#ccc";
                        $dailyScheduled[incDiv].innerHTML = "";
                        return;
                    }
                    element.classList.add("selected");
                    $dailyScheduled[incDiv].style.backgroundColor = "#7335d2";
                    $dailyScheduled[incDiv].setAttribute("data-id", "social");
                    $dailyScheduled[incDiv].innerHTML = `
                    <p class="p-hours" id="p-hours-social">${element.textContent} <span class="span-hours" id="daily-scheduled-hour-social"> ${$dailyClockHourDisplay.textContent}</span></p>  
                    `;
                    incDiv++;
                }

                if (element.innerText === "Self Care") {
                    if (dailyScheduledHourSelfCare !== null) {
                        $dailyClockHourDisplay.innerText =
                            dailyScheduledHourSelfCare.innerText;
                        $dailyHand.style.transform = dataHandHourStyleSelfCare;
                    }
                    if (element.classList.contains("selected")) {
                        $dailyScheduled[incDiv].style.backgroundColor = "#ccc";
                        $dailyScheduled[incDiv].innerHTML = "";
                        return;
                    }
                    element.classList.add("selected");
                    $dailyScheduled[incDiv].style.backgroundColor = "#f1c75b";
                    $dailyScheduled[incDiv].setAttribute(
                        "data-id",
                        "self-care"
                    );
                    $dailyScheduled[incDiv].innerHTML = `
                    <p class="p-hours" id="p-hours-self-care">${element.textContent} <span class="span-hours" id="daily-scheduled-hour-self-care"> ${$dailyClockHourDisplay.textContent}</span></p>  
                    `;
                    incDiv++;
                }
            }
        });
    });
}

let selectedElement;

function agendaElementSelect() {
    $dailyScheduled.forEach((element) => {
        element.addEventListener("mousedown", (e) => {
            $dailyScheduled.forEach((b) => b.classList.remove("selected"));
            // Guarda o elemento clicado
            element.classList.add("selected");

            selectedElement = element;
        });
    });
}

let dataHourWork;
let dataHandHourStyleWork;
let dataHourPlay;
let dataHandHourStylePlay;
let dataHourStudy;
let dataHandHourStyleStudy;
let dataHourExercise;
let dataHandHourStyleExercise;
let dataHourSocial;
let dataHandHourStyleSocial;
let dataHourSelfCare;
let dataHandHourStyleSelfCare;

function SelectedHandMovAgenda() {
    $dailyHand.addEventListener("mousemove", () => {
        const dailyScheduledHourWork = document.getElementById(
            "daily-scheduled-hour-work"
        );
        const dailyScheduledHourPlay = document.getElementById(
            "daily-scheduled-hour-play"
        );
        const dailyScheduledHourStudy = document.getElementById(
            "daily-scheduled-hour-study"
        );
        const dailyScheduledHourExercise = document.getElementById(
            "daily-scheduled-hour-exercise"
        );
        const dailyScheduledHourSocial = document.getElementById(
            "daily-scheduled-hour-social"
        );
        const dailyScheduledHourSelfCare = document.getElementById(
            "daily-scheduled-hour-self-care"
        );
        $dailyScheduled.forEach((element) => {
            if (
                element.classList.contains("selected") &&
                element.dataset.id === "work"
            ) {
                ultimoClicado = null;
                dailyScheduledHourWork.innerText = `${dailyHours}h`;
                dataHourWork = `${dailyHours}h`;
                dataHandHourStyleWork = $dailyHand.style.transform;
            }
            if (
                element.dataset.id === "play" &&
                element.classList.contains("selected")
            ) {
                ultimoClicado = null;
                dailyScheduledHourPlay.innerText = `${dailyHours}h`;
                dataHourPlay = `${dailyHours}h`;
                dataHandHourStylePlay = $dailyHand.style.transform;
            }
            if (
                element.dataset.id === "study" &&
                element.classList.contains("selected")
            ) {
                ultimoClicado = null;
                dailyScheduledHourStudy.innerText = `${dailyHours}h`;
                dataHourStudy = `${dailyHours}h`;
                dataHandHourStyleStudy = $dailyHand.style.transform;
            }
            if (
                element.dataset.id === "exercise" &&
                element.classList.contains("selected")
            ) {
                ultimoClicado = null;
                dailyScheduledHourExercise.innerText = `${dailyHours}h`;
                dataHourExercise = `${dailyHours}h`;
                dataHandHourStyleExercise = $dailyHand.style.transform;
            }
            if (
                element.dataset.id === "social" &&
                element.classList.contains("selected")
            ) {
                ultimoClicado = null;
                dailyScheduledHourSocial.innerText = `${dailyHours}h`;
                dataHourSocial = `${dailyHours}h`;
                dataHandHourStyleSocial = $dailyHand.style.transform;
            }
            if (
                element.dataset.id === "self-care" &&
                element.classList.contains("selected")
            ) {
                ultimoClicado = null;
                dailyScheduledHourSelfCare.innerText = `${dailyHours}h`;
                dataHourSelfCare = `${dailyHours}h`;
                dataHandHourStyleWork = $dailyHand.style.transform;
            }
        });
    });
}

function samePlaceResetHandHour() {
    $dailyScheduled.forEach((element) => {
        element.addEventListener("click", () => {
            if (selectedElement.dataset.id === "work") {
                let dailyScheduledHourWorkResult = document.getElementById(
                    "daily-scheduled-hour-work"
                );
                if (dailyScheduledHourWorkResult.innerText === "0h") {
                    $dailyClockHourDisplay.textContent = "0h";
                    $dailyHand.style.transform =
                        "translateX(-50%) rotate(0deg)";
                    return;
                }
                dailyScheduledHourWorkResult.innerText = dataHourWork;
                $dailyClockHourDisplay.textContent = dataHourWork;
                $dailyHand.style.transform = dataHandHourStyleWork;
            } else if (selectedElement.dataset.id === "play") {
                let dailyScheduledHourPlayResult = document.getElementById(
                    "daily-scheduled-hour-play"
                );
                if (dailyScheduledHourPlayResult.innerText === "0h") {
                    $dailyClockHourDisplay.textContent = "0h";
                    $dailyHand.style.transform =
                        "translateX(-50%) rotate(0deg)";
                    return;
                }
                $dailyClockHourDisplay.textContent = dataHourPlay;
                $dailyHand.style.transform = dataHandHourStylePlay;
            } else if (selectedElement.dataset.id === "study") {
                console.log(dataHourStudy);
                let dailyScheduledHourStudyResult = document.getElementById(
                    "daily-scheduled-hour-study"
                );
                if (dailyScheduledHourStudyResult.innerText === "0h") {
                    $dailyClockHourDisplay.textContent = "0h";
                    $dailyHand.style.transform =
                        "translateX(-50%) rotate(0deg)";
                    return;
                }
                dailyScheduledHourStudyResult = dataHourStudy;
                $dailyClockHourDisplay.textContent = dataHourStudy;
                $dailyHand.style.transform = dataHandHourStyleStudy;
            } else if (selectedElement.dataset.id === "exercise") {
                let dailyScheduledHourExerciseResult = document.getElementById(
                    "daily-scheduled-hour-exercise"
                );
                if (dailyScheduledHourExerciseResult.innerText === "0h") {
                    $dailyClockHourDisplay.textContent = "0h";
                    $dailyHand.style.transform =
                        "translateX(-50%) rotate(0deg)";
                    return;
                }
                $dailyClockHourDisplay.textContent = dataHourExercise;
                $dailyHand.style.transform = dataHandHourStyleExercise;
            } else if (selectedElement.dataset.id === "social") {
                let dailyScheduledHourSocialResult = document.getElementById(
                    "daily-scheduled-hour-social"
                );
                if (dailyScheduledHourSocialResult.innerText === "0h") {
                    $dailyClockHourDisplay.textContent = "0h";
                    $dailyHand.style.transform =
                        "translateX(-50%) rotate(0deg)";
                    return;
                }
                dailyScheduledHourSocialResult = dataHourSocial;
                $dailyClockHourDisplay.textContent = dataHourSocial;
                $dailyHand.style.transform = dataHandHourStyleSocial;
            } else if (selectedElement.dataset.id === "self-care") {
                let dailyScheduledHourSelfCareResult = document.getElementById(
                    "daily-scheduled-hour-self-care"
                );
                if (dailyScheduledHourSelfCareResult.innerText === "0h") {
                    $dailyClockHourDisplay.textContent = "0h";
                    $dailyHand.style.transform =
                        "translateX(-50%) rotate(0deg)";
                    return;
                }
                dailyScheduledHourSelfCareResult = dataHourSelfCare;
                $dailyClockHourDisplay.textContent = dataHourSelfCare;
                $dailyHand.style.transform = dataHandHourStyleSelfCare;
            }
        });
    });
}

function clickDailyOptionsMoveHandHour() {
    $dailyHand.addEventListener("mousemove", () => {
        if (!ultimoClicado) return;
        $dailyScheduled.forEach((element) => {
            console.log(ultimoClicado);
            switch (ultimoClicado.innerText) {
                case "Work": {
                    const dailyScheduledHourWork = document.getElementById(
                        "daily-scheduled-hour-work"
                    );
                    if (element.dataset.id === "work") {
                        dailyScheduledHourWork.textContent = `${dailyHours}h`;
                        dataHandHourStyleWork = $dailyHand.style.transform;
                        dataHourWork = `${dailyHours}h`;
                    }
                    element.classList.remove("selected");
                    break;
                }
                case "Play": {
                    const dailyScheduledHourPlay = document.getElementById(
                        "daily-scheduled-hour-play"
                    );
                    if (element.dataset.id === "play") {
                        dailyScheduledHourPlay.textContent = `${dailyHours}h`;
                        dataHandHourStylePlay = $dailyHand.style.transform;
                        dataHourPlay = `${dailyHours}h`;
                    }
                    element.classList.remove("selected");
                    break;
                }
                case "Study": {
                    const dailyScheduledHourStudy = document.getElementById(
                        "daily-scheduled-hour-study"
                    );
                    if (element.dataset.id === "study") {
                        dailyScheduledHourStudy.textContent = `${dailyHours}h`;
                        dataHandHourStyleStudy = $dailyHand.style.transform;
                        dataHourStudy = `${dailyHours}h`;
                    }
                    element.classList.remove("selected");
                    break;
                }
                case "Exercise": {
                    if (element.dataset.id === "exercise") {
                        selectedElement = null;
                    }
                    const dailyScheduledHourExercise = document.getElementById(
                        "daily-scheduled-hour-exercise"
                    );
                    if (dailyScheduledHourExercise) {
                        dailyScheduledHourExercise.textContent = `${dailyHours}h`;
                        dataHandHourStyleExercise = $dailyHand.style.transform;
                        dataHourExercise = `${dailyHours}h`;
                    }
                    break;
                }
                case "Social": {
                    if (selectedElement) {
                        selectedElement = null;
                    }
                    const dailyScheduledHourSocial = document.getElementById(
                        "daily-scheduled-hour-social"
                    );
                    if (dailyScheduledHourSocial) {
                        dailyScheduledHourSocial.textContent = `${dailyHours}h`;
                        dataHandHourStyleSocial = $dailyHand.style.transform;
                        dataHourSocial = `${dailyHours}h`;
                    }
                    break;
                }
                case "Self Care": {
                    if (selectedElement) {
                        selectedElement = null;
                    }
                    const dailyScheduledHourSelfCare = document.getElementById(
                        "daily-scheduled-hour-self-care"
                    );
                    if (dailyScheduledHourSelfCare) {
                        dailyScheduledHourSelfCare.textContent = `${dailyHours}h`;
                        dataHandHourStyleSelfCare = $dailyHand.style.transform;
                        dataHourSelfCare = `${dailyHours}h`;
                    }
                    break;
                }
                default:
                    break;
            }
        });
    });
}
