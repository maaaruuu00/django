var totalScore = 0; // 총 점수를 저장할 변수
var highScore = 0; // 최고 점수

window.onload = function() {

    var gameScreen = document.getElementById('game-screen');
    var resultScreen = document.getElementById('result-screen');
    var startTime = 0; // 추가 점수를 위한 시간 시작 값
    var timeLeft = 0; // 남은 시간

    // 게임 여부 플래그 가져오기
    var gameDataElement = document.getElementById('game-data');
    var isGame = gameDataElement ? gameDataElement.dataset.isGame === 'True' : false;

    if (isGame) {

        // 게임 타이머 관련 코드
        var memoryTestData = document.getElementById('memory-test-data');
        var wordsCount = parseInt(memoryTestData.dataset.wordsCount);

        function startTimer(duration) {
            var timer = duration, seconds;
            var display = document.getElementById('time');
            var interval = setInterval(function () {
                seconds = parseInt(timer % 60, 10);
                timeLeft = seconds; // 남은 시간 저장
                if (--timer < 0) {
                    clearInterval(interval);
                    timeLeft = 0; // 시간이 0보다 작아지면 0으로 고정
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
                    startTime = wordsCount * 10;  // 추가 점수를 위한 시작 시간 설정
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
            submitButton.addEventListener('click', function (event) {
                // event.preventDefault(); // 폼의 기본 제출 동작을 막음
                this.style.backgroundColor = '#007bff';
                
                // 기본 점수 계산
                var correctWords = document.querySelectorAll('.input-word.hidden-word');
                var correctCount = correctWords.length;
                var basicScore = correctCount * 10;
            
                // 추가 점수 계산
                var bonusScore = Math.max(0, timeLeft);
                totalScore = basicScore + bonusScore;
            
                console.log("기본 점수: " + basicScore);
                console.log("추가 점수: " + bonusScore);
                console.log("총 점수: " + totalScore);
            
                // 결과 화면 전환 및 점수 표시 업데이트
                document.getElementById('result-screen').style.display = 'block';
                gameScreen.style.display = 'none';  // 게임 화면 숨기기
            
                // 점수 표시 업데이트
                var scoreDisplay = document.getElementById("score-display");
                if (scoreDisplay) {
                    scoreDisplay.textContent = `게임 점수: ${totalScore}점 || 최고 점수: ${highScore}점`;
                    console.log("Updated text content: " + scoreDisplay.textContent);
                } else {
                    console.error("score-display 요소를 찾을 수 없습니다.");
                }
            });
            
            
            
        }

    } else {
        resultScreen.style.display = 'block';
        gameScreen.style.display = 'none';  // 게임 화면 숨기기
    }
}
