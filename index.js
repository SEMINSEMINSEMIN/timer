const $form = document.querySelector('.timer-settings');
const $startBtn = $form.querySelector('.start-btn');
$form.addEventListener('submit', e => e.preventDefault());

class Timer {
    constructor($hrs, $min, $sec){
        this.leftTime =
        $sec + $min * 60 + $hrs * 3600;
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
    if (validation($hrs, $min, $sec)){
        const timeData = new Timer(parseInt($hrs.value), parseInt($min.value), parseInt($sec.value));
        console.log(timeData);
    } else {
        window.alert("값을 제대로 입력하세요.");
    }
});