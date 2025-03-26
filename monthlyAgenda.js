const $monthlyClock = document.getElementById("monthly-clock");
const $monthlyHand = document.getElementById("monthly-hand");
const $monthlyHourDisplay = document.getElementById("monthly-hour-display");
const $monthlySelectOption = document.getElementById("monthly-select-option");
const $monthlyClose = document.getElementById("monthly-close");

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
