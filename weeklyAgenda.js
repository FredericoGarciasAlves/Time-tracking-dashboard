const $weeklyClock = document.getElementById("weekly-clock");
const $weeklyHand = document.getElementById("weekly-hand");
const $weeklyHourDisplay = document.getElementById("weekly-hour-display");
const $weeklySelectOption = document.getElementById("weekly-select-option");
const $weeklyClose = document.getElementById("weekly-close");

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
