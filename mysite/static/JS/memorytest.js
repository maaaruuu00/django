document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById('words-display')) {
        // 게임 타이머와 관련된 코드
        var memoryTestData = document.getElementById('memory-test-data');
        var wordsCount = parseInt(memoryTestData.dataset.wordsCount);

        // 게임 타이머 시작 함수
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

        // 타이머 시작
        var timePerWord = 3;
        var totalTime = wordsCount * timePerWord;
        startTimer(totalTime);

        // 제출 버튼 터치 이벤트 처리
        var submitButton = document.querySelector('.btn-submit');
        if (submitButton) {
            submitButton.addEventListener('touchstart', function () {
                this.style.backgroundColor = '#0056b3';
            });
            submitButton.addEventListener('touchend', function () {
                this.style.backgroundColor = '#007bff';

                // 제출 후 결과 화면을 보여줌
                document.getElementById('result-screen').style.display = 'block';

                window.history.replaceState(null, null, window.location.href);  // 페이지 상태 기록
            });
        }

    } 
    // 결과 페이지 처리 (memorytest_result.html)
    else if (document.getElementById('memory-test-data')) {

        // 히스토리 스택에 결과 페이지 상태 추가
        window.history.pushState(null, null, window.location.href);

        
    }
});
