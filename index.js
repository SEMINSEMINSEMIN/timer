// https://dororongju.tistory.com/125
// https://dev.to/walternascimentobarroso/notification-with-audio-in-javascript-4iao
function getNotificationPermission() {
    // 브라우저 지원 여부 체크
    if (!("Notification" in window)) {
        alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
    }
    // 데스크탑 알림 권한 요청
    Notification.requestPermission(function (result) {
        // 권한 거절
        if(result == 'denied') {
            alert('알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다.');
            return false;
        }
    });
}

getNotificationPermission();

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
        this.timerId = undefined;
    }

    static zeroValCon(time){
        if (time.value.length === 1){
            time.value = '0' + time.value;
        } else if (time.value === ''){
            time.value = '00';
        } else if (time.value.length >= 3){
            time.value = parseInt(time.value, 10).toString();
        } else {
            time.value = time.value;
        }
    }

    static notify() {
        const options = {
            body: "타이머 시간이 종료되었습니다."
        }
        
        // 데스크탑 알림 요청
        const notification = new Notification("종료 알림", options);
        let audio = new Audio("./alert.mp3");
        audio.load();
        audio.play();
        
        // 3초뒤 알람 닫기
        setTimeout(function(){
            notification.close();
        }, 3000);
    }
    

    setup(){
        this.bindEvents();
    }

    timeCount(){
        this.$startBtn.classList.add("hide");
        this.$pauseBtn.classList.remove("hide");

        if (this.leftTime <= 0){
            this.timerReset();
            Timer.notify();
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
        Timer.zeroValCon(this.$hrs);
        Timer.zeroValCon(this.$min);
        Timer.zeroValCon(this.$sec);
    }

    timeValidation(){   
        if (
            (parseInt(this.$hrs.value, 10) === 0 &&
            parseInt(this.$min.value, 10) === 0 &&
            parseInt(this.$sec.value, 10) === 0) ||
            this.$hrs.value == "" ||
            this.$min.value == "" ||
            this.$sec.value == "" ||
            parseInt(this.$hrs.value, 10) < 0 ||
            parseInt(this.$min.value, 10) < 0 ||
            parseInt(this.$sec.value, 10) < 0 ||
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