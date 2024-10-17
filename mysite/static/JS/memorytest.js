document.addEventListener("DOMContentLoaded", function () {

    var gameScreen = document.getElementById('game-screen');
    var resultScreen = document.getElementById('result-screen');


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

                // 결과 화면 전환
                document.getElementById('result-screen').style.display = 'block';
                gameScreen.style.display = 'none';  // 게임 화면 숨기기
            });
            submitButton.addEventListener('touchend', function () {
                this.style.backgroundColor = '#007bff';
                
                // 결과 화면 전환
                document.getElementById('result-screen').style.display = 'block';
                gameScreen.style.display = 'none';  // 게임 화면 숨기기
                

            });

            submitButton.addEventListener('click', function () {
                this.style.backgroundColor = '#007bff';
                
            
                document.getElementById('result-screen').style.display = 'block';
                gameScreen.style.display = 'none';  // 게임 화면 숨기기
                
            });
            
        }
    } else {
        
        resultScreen.style.display = 'block';
        gameScreen.style.display = 'none';  // 게임 화면 숨기기
        
    }


    
    
});
