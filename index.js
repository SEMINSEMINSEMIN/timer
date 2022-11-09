class Timer {
    constructor(){
        const $form = document.querySelector('.timer-settings');
        $form.addEventListener('submit', e => e.preventDefault());
        this.$hrs = $form.querySelector('#hrs');
        this.$min = $form.querySelector('#min');
        this.$sec = $form.querySelector('#sec');
        this.$startBtn = $form.querySelector('.start-btn');
        this.$pauseBtn = $form.querySelector('.pause-btn');
        this.leftTime = 0;
        this.isPaused = false;
    }

    setup(){
        this.bindEvents();
    }

    timeCount(){
        // if (this.leftTime <= 0 || this.isPaused === true){
        //     return;
        // }

        // 1로 하면 정확하지가 않음
        // 의호님 의견으로는 1000으로 하고 정확하지 않으면 내림 처리 하실거 같다고 함
        // https://sawol-today.tistory.com/396
        // https://deeplify.dev/front-end/js/timer-functions
        // setTimeout(()=>{
        //     // console.log(this.leftTime);
        //     this.leftTime = this.leftTime - 1000;
        //     if (this.leftTime % 1000 === 0){
        //         console.log(this.leftTime / 1000);
        //     }
        //     this.timeCount();
        // }, 1000);
        if (this.leftTime > 0){
            const z = setInterval(()=>{
                this.leftTime -= 1000;
                if (this.leftTime % 1000 === 0){
                    console.log(this.leftTime);
                }
                if (this.leftTime <= 0){
                    clearInterval(z);
                }
            }, 1000);
        }
    }

    timerStart(){
        this.leftTime = (
            parseInt(this.$sec.value) + 
            parseInt(this.$min.value * 60) + 
            parseInt(this.$hrs.value * 3600)
        ) * 1000;

        // console.log(this.leftTime);

        this.timeCount.bind(this)();

        // if (this.leftTime <= 0 || this.isPaused == true){
        //     console.log('끝');
        //     return
        // }
        // setTimeout(() => {
        //     this.leftTime = this.leftTime - 1;
        //     console.log(this.leftTime);
        //     this.timerStart();
        // }, 1000)
    }

    bindEvents(){
        this.$startBtn.addEventListener('click', e => {
            this.timerStart();
        });
    }
}

const timer = new Timer();
timer.setup();

// function validation(hrsEl, minEl, secEl){
//     if (
//         (hrsEl.value >= hrsEl.min && hrsEl.value <= hrsEl.max) &&
//         (minEl.value >= minEl.min && minEl.value <= minEl.max) &&
//         (secEl.value >= secEl.min && secEl.value <= secEl.max)
//     ) {
//         return true;
//     } else {
//         return false;
//     }
// }

// $startBtn.addEventListener('click', e => {
//     const $hrs = $form.querySelector("#hrs");
//     const $min = $form.querySelector("#min");
//     const $sec = $form.querySelector("#sec");

//     if (validation($hrs, $min, $sec)){
//         const timeData = new Timer(
//             parseInt($hrs.value), 
//             parseInt($min.value), 
//             parseInt($sec.value)
//         );
//         console.log(timeData);
//         timeData.timerStart();
//     } else {
//         window.alert("값을 제대로 입력하세요.");
//     }
// });

// $pauseBtn.addEventListener('click', e => {

// })