const $form = document.querySelector('.timer-settings');
const $startBtn = $form.querySelector('.start-btn');
$form.addEventListener('submit', e => e.preventDefault());

class Timer {
    constructor(){
        this.hrs = $hrs.value;
        this.min = $min.value;
        this.sec = $sec.value;
    }
}

function validation(hrsEl, minEl, secEl){
    if (
        (hrsEl.value >= hrsEl.min && hrsEl.value <= hrsEl.max) &&
        (minEl.value >= minEl.min && minEl.value <= minEl.max) &&
        (secEl.value >= secEl.min && secEl.value <= secEl.max)
    ) {
        return true;
    } else {
        return false;
    }
}

$startBtn.addEventListener('click', e => {
    const $hrs = $form.querySelector("#hrs");
    const $min = $form.querySelector("#min");
    const $sec = $form.querySelector("#sec");
    console.log(validation($hrs, $min, $sec));
});