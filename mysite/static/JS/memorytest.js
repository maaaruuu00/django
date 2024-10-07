document.addEventListener("DOMContentLoaded", function() {
    // 특정 요소의 존재 여부로 페이지를 구분
    if (document.getElementById('words-display')) {
        // 이 코드는 words-display 요소가 있는 페이지에서만 실행됩니다.

        // wordsCount 값을 가져오기 (memory-test-data 요소가 존재하는지 확인)
        var memoryTestData = document.getElementById('memory-test-data');
        if (memoryTestData) {
            var wordsCount = parseInt(memoryTestData.dataset.wordsCount);
            console.log("wordsCount: ", wordsCount);
        } else {
            console.error("memory-test-data div not found!");
            return;
        }

        // 게임 타이머 관련 기존 코드
        function startTimer(duration) {
            var timer = duration, seconds;
            var display = document.getElementById('time');
            var interval = setInterval(function () {
                seconds = parseInt(timer % 60, 10);
                if (--timer < 0) {
                    clearInterval(interval);
                    var inputs = document.querySelectorAll('.input-word');
                    inputs.forEach(function(input) {
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
                    document.getElementById('instruction').textContent = '기억한 단어들을 순서대로 입력하세요';
                    display.textContent = seconds + "초 남음";
                }
            }, 1000);
        }

        // 타이머 시작
        var timePerWord = 3;
        var totalTime = wordsCount * timePerWord;
        startTimer(totalTime);

        // 뒤로 가기 처리
        window.history.replaceState(null, null, window.location.href);
        window.onpopstate = function(event) {
            document.getElementById('hidden-game-link').click();
        };

        // 모바일 키보드 닫기
        document.addEventListener('input', function (event) {
            if (event.target.classList.contains('input-word')) {
                event.target.addEventListener('blur', function () {
                    window.scrollTo(0, 0);
                });
            }
        });

        // 제출 버튼 터치 이벤트 처리
        var submitButton = document.querySelector('.btn-submit');
        if (submitButton) {
            submitButton.addEventListener('touchstart', function() {
                this.style.backgroundColor = '#0056b3';
            });

            submitButton.addEventListener('touchend', function() {
                this.style.backgroundColor = '#007bff';

                // 제출 후 히스토리 상태를 확인하는 코드 추가
                console.log("현재 페이지에서 제출 버튼이 터치되었습니다.");
                console.log("현재 히스토리 스택에서의 위치: ", window.location.href);

                // 제출 후 현재 페이지를 히스토리에 기록
                window.history.replaceState(null, null, window.location.href);
            });
        }

    } else if (document.getElementById('result-page')) {
        // 결과 페이지에서만 실행

        // 뒤로 가기 시 game.html로 바로 이동하도록 처리
        window.history.replaceState(null, null, window.location.href);
        window.onpopstate = function(event) {
            document.getElementById('hidden-game-link').click();
        };
    }
});
