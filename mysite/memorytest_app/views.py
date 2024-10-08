from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import reverse
import random
import os

# 단어 리스트 파일 경로
WORDS_FILE_PATH = os.path.join(os.path.dirname(__file__), 'nouns.txt')

def load_words(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        words = file.read().splitlines()
    return words

words_list = load_words(WORDS_FILE_PATH)

def index(request):
    if 'level' not in request.session:
        request.session['level'] = 3  # 기본 단어 개수 3개

    level = request.session['level']
    words = random.sample(words_list, level)
    context = {
        'words': words,
        'is_game': True  # 게임 진행 상태 플래그
    }
    return render(request, 'memorytest.html', context)

def check(request):
    if request.method == 'POST':
        given_words = request.POST.getlist('words')
        correct_words = request.POST.getlist('correct_words')
        correct_count = sum(1 for given_word, correct_word in zip(given_words, correct_words) if given_word == correct_word)
        total = len(correct_words)

        if correct_count == total:
            request.session['level'] += 1  # 맞춘 경우 단어 개수 증가
            message = f"정답입니다! {total}개의 단어를 모두 맞췄습니다."
        else:
            request.session['level'] = 3  # 틀린 경우 단어 개수 초기화
            message = f"틀렸습니다. {total}개의 단어 중 {correct_count}개를 맞췄습니다."

        # 결과 데이터 전달
        word_pairs = [(correct_word, given_word) for correct_word, given_word in zip(correct_words, given_words)]

        context = {
            'message': message,
            'word_pairs': word_pairs,
            'total': total,
            'is_game': False  # 결과 상태 플래그
        }

        return render(request, 'memorytest.html', context)

    return HttpResponse("Invalid request")
