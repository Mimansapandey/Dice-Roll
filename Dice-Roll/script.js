'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRules = document.querySelector('.btn--rules');
const modalWindow = document.querySelector('.modal');
const modalWinner = document.querySelector('.winner');
const modalClose = document.querySelector('.close');
const modal = document.querySelector('.modal--1');

let currentScore0,
  currentScore1,
  activePlayer,
  totalScore0,
  totalScore1,
  playing;
let scores = [];
const init = function () {
  currentScore1 = 0;
  currentScore0 = 0;
  activePlayer = 0;
  totalScore0 = 0;
  totalScore1 = 0;
  playing = true;
  scores = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  document.querySelector('.modal--1').classList.add('hidden');
};
init();

//switching player
const switchplayer = function () {
  if (activePlayer === 0) {
    currentScore0 = 0;
    activePlayer = 1;
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
    document.getElementById('current--0').textContent = 0;
  } else {
    currentScore1 = 0;
    activePlayer = 0;
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
    document.getElementById('current--1').textContent = 0;
  }
};

//dice roll
btnRoll.addEventListener('click', function () {
  document.querySelector('.modal--1').classList.add('hidden');
  if (playing) {
    const number = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${number}.png`;
    //if it a 1?
    if (number !== 1) {
      if (activePlayer === 0) {
        currentScore0 += number;
        document.getElementById('current--0').textContent = currentScore0;
      } else {
        currentScore1 += number;
        document.getElementById('current--1').textContent = currentScore1;
      }
    } else {
      switchplayer();
    }
  }
});

//Hold button

btnHold.addEventListener('click', function () {
  document.querySelector('.modal--1').classList.add('hidden');
  if (playing) {
    if (activePlayer === 0) {
      totalScore0 += currentScore0;
      document.getElementById('score--0').textContent = totalScore0;
    } else {
      totalScore1 += currentScore1;
      document.getElementById('score--1').textContent = totalScore1;
    }
    switchplayer();
  }
  if (totalScore0 >= 50) {
    playing = false;
    diceEl.classList.add('hidden');

    document.querySelector(`.player--0`).classList.add('player--winner');
    document.querySelector(`.player--0`).classList.remove('player--active');
    winner();
  } else if (totalScore1 >= 50) {
    playing = false;
    diceEl.classList.add('hidden');

    document.querySelector(`.player--1`).classList.add('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--active');
    winner();
  }
});

//replay
btnNew.addEventListener('click', function () {
  init();
  document.querySelector('.modal--1').classList.add('hidden');
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  if (player1.classList.contains('player--winner')) {
    player1.classList.remove('player--winner');
  } else if (player2.classList.contains('player--winner')) {
    player2.classList.remove('player--winner');
  }
});

//Rules
btnRules.addEventListener('click', function () {
  document.querySelector('.modal--1').classList.remove('hidden');
  diceEl.classList.add('hidden');
  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'Escape' &&
      !document.querySelector('.modal--1').classList.contains('hidden')
    ) {
      document.querySelector('.modal--1').classList.add('hidden');
    }
  });
  document.querySelector('.closebtn').addEventListener('click', function () {
    document.querySelector('.modal--1').classList.add('hidden');
  });
});

//winner
const winner = function () {
  document.querySelector('.modal').classList.remove('hidden');
  modalClose.addEventListener('click', function () {
    document.querySelector('.modal').classList.add('hidden');
  });
  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'Escape' &&
      !document.querySelector('.modal').classList.contains('hidden')
    ) {
      document.querySelector('.modal').classList.add('hidden');
    }
  });
};

