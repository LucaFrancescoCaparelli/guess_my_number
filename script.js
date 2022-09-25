'use strict';

let secretNumber = createSecretNumber();
let score = 20;
let highScore = 0;

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function changeStyles(element, property, value) {
  document.querySelector(element).style[`${property}`] = value;
}

function createSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function checkHighScore() {
  if (score > highScore) {
    highScore = score;
    document.querySelector('.highscore').textContent = highScore;
  }
}

function changeText(element, value) {
  document.querySelector(element).textContent = value;
}

function resetGame() {
  score = 20;
  secretNumber = createSecretNumber();
  changeText('.score', score);
  displayMessage('Start guessing..');
  changeText('.number', '?');
  changeStyles('body', 'backgroundColor', '#222');
  changeStyles('.number', 'width', '15rem');
  document.querySelector('.guess').value = '';
}

document.querySelector('.again').addEventListener('click', resetGame);

document.querySelector('.check').addEventListener('click', function () {
  const guessNumber = Number(document.querySelector('.guess').value);
  if (!guessNumber) {
    displayMessage('⛔ No number!');
  } else if (guessNumber === secretNumber) {
    displayMessage('🎉 Correct number!');
    changeText('.number', secretNumber);
    changeStyles('body', 'backgroundColor', '#60b347');
    changeStyles('.number', 'width', '30rem');

    checkHighScore();
  } else if (guessNumber !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guessNumber > secretNumber ? '📈 Too high!' : '📉 Too low!'
      );
      score--;
      changeText('.score', score);
    } else {
      displayMessage('💥 You lost the game!');
      changeText('.score', 0);
    }
  }
});
