const $form = document.querySelector('.timer-settings');
$form.addEventListener('submit', e => e.preventDefault());

class Timer {
    constructor(){
        this.$hrs = $form.querySelector('#hrs');
        this.$min = $form.querySelector('#min');
        this.$sec = $form.querySelector('#sec');
        this.$startBtn = $form.querySelector('.start-btn');
        this.$pauseBtn = $form.querySelector('.pause-btn');
        this.$resetBtn = $form.querySelector('.reset-btn');
        this.leftTime = 0;
        this.isPaused = false;
        this.timerId = undefined;
    }

    setup(){
        this.bindEvents();
    }

    timeCount(){
        this.$startBtn.classList.add("hide");
        this.$pauseBtn.classList.remove("hide");

        if (this.leftTime <= 0 || this.isPaused === true){
            return;
        }
        // 1로 하면 정확하지가 않음
        // 의호님 의견으로는 1000으로 하고 정확하지 않으면 내림 처리 하실거 같다고 함
        // https://sawol-today.tistory.com/396
        // https://deeplify.dev/front-end/js/timer-functions
        // https://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate
        // https://stackoverflow.com/questions/13095972/is-it-possible-to-have-setinterval-set-too-fast
        this.timerId = setTimeout(()=>{
            this.leftTime = this.leftTime - 1000;
            let baseTime = this.leftTime / 1000;
            this.$hrs.value = 
                Math.floor(baseTime / 3600).toString().length === 1 ? '0' + Math.floor(baseTime / 3600).toString() :
                Math.floor(baseTime / 3600).toString();
            baseTime = baseTime % 3600;
            this.$min.value = 
                Math.floor(baseTime / 60).toString().length === 1 ?
                '0' + Math.floor(baseTime / 60).toString() :
                Math.floor(baseTime / 60).toString();
            baseTime = baseTime % 60;
            this.$sec.value = 
                baseTime.toString().length === 1 ?
                '0' + baseTime.toString() : 
                baseTime.toString();
            this.timeCount();
        }, 1000);
    }

    zeroValidation(){
        if (this.$hrs.value.toString().length === 1){
            this.$hrs.value = '0' + this.$hrs.value.toString();
        } else if (this.$hrs.value.toString() === ''){
            this.$hrs.value = '00';
        } else {
            this.$hrs.value = this.$hrs.value.toString();
        }

        if (this.$min.value.toString().length === 1){
            this.$min.value = '0' + this.$min.value.toString();
        } else if (this.$min.value.toString() === ''){
            this.$min.value = '00';
        } else {
            this.$min.value = this.$min.value.toString();
        }

        if (this.$sec.value.toString().length === 1){
            this.$sec.value = '0' + this.$sec.value.toString();
        } else if (this.$sec.value.toString() === ''){
            this.$sec.value = '00';
        } else {
            this.$sec.value = this.$sec.value.toString();
        }
    }

    timeValidation(){    
        if (
            parseInt(this.$hrs.value, 10) === 0 &&
            parseInt(this.$min.value, 10) === 0 &&
            parseInt(this.$sec.value, 10) === 0
        ) {
            this.leftTime = 0;
            this.$startBtn.classList.remove("abled");
            this.$resetBtn.classList.remove("abled");
            this.$startBtn.setAttribute("disabled", "");
            this.$resetBtn.setAttribute("disabled", "");
        } else if (
            parseInt(this.$min.value, 10) > parseInt(this.$min.max, 10) ||
            parseInt(this.$sec.value, 10) > parseInt(this.$sec.max, 10)
        ) {
            this.leftTime = 0;
            this.$startBtn.classList.remove("abled");
            this.$resetBtn.classList.remove("abled");
            this.$startBtn.setAttribute("disabled", "");
            this.$resetBtn.setAttribute("disabled", "");
        } else {
            this.timeDataSet();
        }
    }

    timeDataSet(){
        this.$startBtn.classList.add("abled");
        this.$resetBtn.classList.add("abled");
        this.$startBtn.removeAttribute("disabled");
        this.$resetBtn.removeAttribute("disabled");

        this.leftTime = (
            parseInt(this.$sec.value) + 
            parseInt(this.$min.value * 60) + 
            parseInt(this.$hrs.value * 3600)
        ) * 1000;
    }

    timerPause(){
        this.$pauseBtn.classList.add("hide");
        this.$startBtn.classList.remove("hide");
        clearTimeout(this.timerId);
    }

    timerReset(){
        this.timerPause();
        this.leftTime = 0;
        this.$hrs.value = "00";
        this.$min.value = "00";
        this.$sec.value = "00";
        this.timerId = undefined;
        this.$startBtn.classList.remove("abled");
        this.$startBtn.setAttribute("disabled", "");
        this.$resetBtn.classList.remove("abled");
        this.$resetBtn.setAttribute("disabled", "");
    }

    bindEvents(){
        $form.addEventListener('keyup', e => {
            if (e.key !== "Backspace" && e.key !== "Tab"){
                this.timeValidation();
            }
        });

        $form.addEventListener('focusout', e => {
            this.zeroValidation();
        })

        this.$startBtn.addEventListener('click', e => {
            this.timeCount();
        });

        this.$pauseBtn.addEventListener('click', e => {
            this.timerPause();
        })

        this.$resetBtn.addEventListener('click', e => {
            this.timerReset();
        })
    }
}

const timer = new Timer();
timer.setup();