document.addEventListener("DOMContentLoaded", function () {

    var gameScreen = document.getElementById('game-screen');
    var resultScreen = document.getElementById('result-screen');

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

                // 서버로 데이터를 제출하는 대신 결과 화면을 표시 (디버깅용)
                document.getElementById('result-screen').style.display = 'block';
                gameScreen.style.display = 'none';  // 게임 화면 숨기기
                window.history.pushState(null, null, window.location.href);  // 페이지 상태 기록
            });
        }
    } else {
        // 게임이 아닌 결과 페이지인 경우
        resultScreen.style.display = 'block';
        gameScreen.style.display = 'none';  // 게임 화면 숨기기
    }

    // DOM 변화를 감지하고, 페이지 벗어나면 game.html로 이동하는 로직 추가
    var observer = new MutationObserver(function (mutationsList, observer) {
        // 감시 대상이 없어졌을 때 동작
        if (!document.body.contains(gameScreen) || !document.body.contains(resultScreen)) {
            console.log("DOM 변화 감지: game.html로 이동");
            window.location.href = '/game/';  // 페이지 벗어날 때 game.html로 리디렉션
        }
    });

    // body를 감시하도록 설정
    observer.observe(document.body, { childList: true, subtree: true });
    
});





