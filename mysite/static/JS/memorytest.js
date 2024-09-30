document.addEventListener("DOMContentLoaded", function() {
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
                // 첫 번째 입력창으로 커서 이동
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

    // 브라우저의 뒤로가기 버튼 클릭 시 game.html로 리다이렉트
    window.onpopstate = function(event) {
        document.getElementById('hidden-game-link').click();  // hidden-game-link 클릭하여 game.html로 이동
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
        });
    }
});
