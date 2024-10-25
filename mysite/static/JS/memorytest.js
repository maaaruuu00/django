let totalScore = 0; // 총 점수를 저장할 변수
let memorytesthighScore = 0; // 최고 점수 변수
let bonusScore = 0; // 보너스 점수를 저장할 변수
var timeLeft = 0; // 남은 시간을 전역 변수로 이동

// 타이머 시작 함수
function startTimer(duration, wordsCount) {
    var timer = duration;
    let initialBonus = wordsCount * 7;
    bonusScore = initialBonus; // 초기 보너스 값 설정
    var display = document.getElementById('time');
    
    var interval = setInterval(function () {
        if (timer <= 0) {
            clearInterval(interval);
            timeLeft = 0;
            bonusScore = Math.max(0, bonusScore); // 보너스 점수가 0 미만이 되지 않도록 설정
            display.textContent = '';
            prepareInputFields(); // 단어 입력 필드를 활성화
        } else {
            timer--;
            timeLeft = timer; 
            bonusScore = initialBonus - (initialBonus - timer); // 매초마다 1씩 보너스 점수 감소
            display.textContent = `${timer}초 남음`;
        }
    }, 1000);
}

// 점수 계산 함수
function calculateScore() {
    let givenWords = document.querySelectorAll('.input-word:not(.hidden-word)');
    let correctWords = document.querySelectorAll('.input-word.hidden-word');
    let correctCount = 0;
    
    // 정답과 입력값 비교
    givenWords.forEach(function(input, index) {
        if (input.value === correctWords[index].value) {
            correctCount++;
        }
    });
    
    let wordsCount = correctWords.length;
    let basicScore = correctCount * 10;
    let finalBonusScore = Math.max(0, bonusScore);  // 남은 시간에 따라 추가 점수

    // 모든 단어를 맞췄을 경우 보너스 추가
    if (correctCount === wordsCount) {
        totalScore = basicScore + finalBonusScore;
    } else {
        totalScore = basicScore;
    }

    console.log("basicScore: " + basicScore);
    console.log("bonusScore: " + finalBonusScore);
    console.log("correctCount: " + correctCount);
    console.log("wordsCount: " + wordsCount);
    
    // 점수 표시
    document.getElementById('score-display').textContent = `게임 점수: ${totalScore}점 | 최고 점수: ${memorytesthighScore}점`;
}

// 입력 필드 준비 함수
function prepareInputFields() {
    var inputs = document.querySelectorAll('.input-word');
    inputs.forEach(function (input) {
        if (input.disabled) {
            input.classList.add('hidden-word');
        } else {
            input.disabled = false;
            input.value = ''; // 입력창 초기화
        }
    });
    document.getElementById('words-display').remove();
    document.getElementById('memory-test-form').style.display = 'block';
    document.getElementById('instruction').textContent = '기억한 단어들을 순서대로 입력하세요';
}

// 제출 버튼 처리
var submitButton = document.querySelector('.btn-submit');
if (submitButton) {
    submitButton.addEventListener('click', function (event) {
        this.style.backgroundColor = '#007bff'; // 버튼 색상 변경
        
        // 점수 계산 함수 호출
        calculateScore();

        // 최고 점수 업데이트
        updateHighScore();

        // 점수 업데이트를 실행하여 화면에 표시
        var scoreDisplay = document.getElementById("score-display");
        if (scoreDisplay) {
            scoreDisplay.textContent = `게임 점수: ${totalScore}점 || 최고 점수: ${memorytesthighScore}점`;
            console.log("Updated text content: " + scoreDisplay.textContent);
        } else {
            console.error("score-display 요소를 찾을 수 없습니다.");
        }

        document.getElementById('result-screen').style.display = 'block';
        document.getElementById('game-screen').style.display = 'none'; // 게임 화면 숨기기

    });
}

// 최고 점수 로드 및 업데이트 함수
function loadHighScore() {
    const savedHighScore = localStorage.getItem("memorytesthighScore");
    if (savedHighScore) {
        memorytesthighScore = parseInt(savedHighScore, 10);
        document.getElementById("score-display").textContent = `게임 점수: ${totalScore}점 | 최고 점수: ${memorytesthighScore}점`;
    }
}
function updateHighScore() {
    if (totalScore > memorytesthighScore) {
        memorytesthighScore = totalScore;
        document.getElementById("score-display").textContent = `게임 점수: ${totalScore}점 | 최고 점수: ${memorytesthighScore}점`;
        localStorage.setItem("memorytesthighScore", memorytesthighScore); // 로컬 저장소에 저장
    }
}

// 점수 업데이트 함수
/*
function updateScoreDisplay() {
    var scoreDisplay = document.getElementById("score-display");
    if (scoreDisplay) {
        scoreDisplay.textContent = `게임 점수: ${totalScore}점 || 최고 점수: ${memorytesthighScore}점`;
        console.log("Updated text content: " + scoreDisplay.textContent);
    } else {
        console.error("score-display 요소를 찾을 수 없습니다.");
    }
}
    */

// 윈도우 로드 이벤트
window.onload = function() {
    loadHighScore(); // 최고 점수 로드

    const savedTotalScore = localStorage.getItem("totalScore");
    if (savedTotalScore) {
        totalScore = parseInt(savedTotalScore, 10);
        //updateScoreDisplay(); // 총 점수 업데이트
    }

    // 게임 여부 확인 및 타이머 시작
    var gameDataElement = document.getElementById('game-data');
    var isGame = gameDataElement ? gameDataElement.dataset.isGame === 'True' : false;

    if (isGame) {
        var memoryTestData = document.getElementById('memory-test-data');
        var wordsCount = parseInt(memoryTestData.dataset.wordsCount);
        var timePerWord = 3;
        var totalTime = wordsCount * timePerWord;
        startTimer(totalTime, wordsCount);
    } else {
        document.getElementById('result-screen').style.display = 'block';
        document.getElementById('game-screen').style.display = 'none'; // 게임 화면 숨기기
    }
};
