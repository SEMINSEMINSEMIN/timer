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
            // console.log(this.leftTime);
            this.leftTime = this.leftTime - 1000;
            if (this.leftTime % 1000 === 0){
                console.log(this.leftTime / 1000);
            }
            this.timeCount();
        }, 1000);
        // if (this.leftTime > 0){
        //     const z = setInterval(()=>{
        //         this.leftTime -= 1000;
        //         if (this.leftTime % 1000 === 0){
        //             console.log(this.leftTime);
        //         }
        //         if (this.leftTime <= 0){
        //             clearInterval(z);
        //         }
        //     }, 1000);
        // }
    }

    timeDataSet(){
        this.$startBtn.classList.add("abled");
        this.$resetBtn.classList.add("abled");
        this.$startBtn.removeAttribute("disabled");
        this.$resetBtn.removeAttribute("disabled");
        this.$resetBtn.classList.add("abled");

        this.leftTime = (
            parseInt(this.$sec.value) + 
            parseInt(this.$min.value * 60) + 
            parseInt(this.$hrs.value * 3600)
        ) * 1000;

        // console.log(this.leftTime);

        // this.timeCount.bind(this)();

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

    timerPause(){
        clearTimeout(this.timerId);
        console.log(this.leftTime);
    }

    timerReset(){
        this.timerPause();
        this.leftTime = 0;
        this.$hrs.value = 0;
        this.$min.value = 0;
        this.$sec.value = 0;
        this.timerId = undefined;
    }

    bindEvents(){
        $form.addEventListener('keyup', e => {
            this.timeDataSet();
        });

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