document.addEventListener("DOMContentLoaded", function () {

    var gameScreen = document.getElementById('game-screen');
    var resultScreen = document.getElementById('result-screen');

    // 결과 화면이 표시되면 flag 값으로 1 설정
    var resultShown = 0;

    // 게임 여부 플래그 가져오기
    var gameDataElement = document.getElementById('game-data');
    var isGame = gameDataElement ? gameDataElement.dataset.isGame === 'True' : false;

    if (isGame) {
        // 게임 타이머와 관련된 코드
        var memoryTestData = document.getElementById('memory-test-data');
        var wordsCount = parseInt(memoryTestData.dataset.wordsCount);

        function startTimer(duration) {
            var timer = duration, seconds;
            var display = document.getElementById('time');
            var interval = setInterval(function () {
                seconds = parseInt(timer % 60, 10);
                if (--timer < 0) {
                    clearInterval(interval);
                    var inputs = document.querySelectorAll('.input-word');
                    inputs.forEach(function (input) {
                        if (input.disabled) {
                            input.classList.add('hidden-word');
                        } else {
                            input.disabled = false;
                            input.value = '';  // 입력창 초기화
                        }
                    });
                    document.getElementById('words-display').remove();
                    document.getElementById('memory-test-form').style.display = 'block';
                    document.getElementById('instruction').textContent = '기억한 단어들을 순서대로 입력하세요';
                    display.textContent = '';
                    document.querySelector('.input-word:not([disabled])').focus();
                } else {
                    display.textContent = seconds + "초 남음";
                }
            }, 1000);
        }

        var timePerWord = 3;
        var totalTime = wordsCount * timePerWord;
        startTimer(totalTime);

        // 제출 버튼 처리
        var submitButton = document.querySelector('.btn-submit');
        if (submitButton) {
            submitButton.addEventListener('touchstart', function () {
                this.style.backgroundColor = '#0056b3';
            });
            submitButton.addEventListener('touchend', function () {
                this.style.backgroundColor = '#007bff';

                // 결과 화면 전환
                document.getElementById('result-screen').style.display = 'block';
                gameScreen.style.display = 'none';  // 게임 화면 숨기기
                resultShown = 1;  // 결과 화면 표시됨
            });
        }
    } else {
        // 게임이 아닌 결과 페이지인 경우
        resultScreen.style.display = 'block';
        gameScreen.style.display = 'none';  // 게임 화면 숨기기
        resultShown = 1;  // 결과 화면 표시됨
    }

    // 결과 화면에서 일정 시간이 지나면 뒤로 가기
    if (resultShown === 1) {
        setTimeout(function () {
            window.history.back();  // 뒤로 가기 동작
        }, 1000);  // 1초 후 실행
    }
    
});


