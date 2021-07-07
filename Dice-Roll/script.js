'use strict';

//Selecting
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');


//storing values
const scores = [0,0];

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

//setting Scores

let currentScore = 0;
let activePlayer = 0;
let totalScore = 0;
let playing = true;

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRules = document.querySelector('.btn--rules');

//modal class

const modalWindow = document.querySelector('.modal');
const modalWinner = document.querySelector('.winner')
const modalClose = document.querySelector('.close');

//initial scores

score0El.textContent = 0;
score1El.textContent = 0;


//Rules

const closeRules = function(){
    document.querySelector('.modal--1').classList.add('hidden');
}

//Switching players

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
     currentScore = 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');   
}

diceEl.classList.add('hidden');

//Rolling Die

btnRoll.addEventListener('click',function(){
closeRules();
    if(playing){

     const diceroll = Math.trunc(Math.random()*6)+1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceroll}.png`; 
        
    if (diceroll !== 1){
        currentScore += diceroll;        
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
 //switching Players

    }else {
       
        switchPlayer();
    }
}
});

//Holding a Score

    btnHold.addEventListener('click', function(){
        closeRules();
        if (playing){
            
    // scores[activePlayer] += currentScore;
        // document.getElementById(`score--${activePlayer}`).textContent =
        // scores[activePlayer];
            
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

        if(scores[activePlayer] >= 20) {
            diceEl.classList.add('hidden');
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

            modalWinner.textContent = `Player ${activePlayer +1 } Wins! 🥳`;
            
            modalWindow.classList.remove('hidden');
            
            //Switching Players
            
        }else{
            switchPlayer();  
        }
       
        }
        
        //1. Adding current score to active players score.
        
        //console.log(scores[activePlayer]);
        //scores[0] = scores[0] + currentScore;
        

        // document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // activePlayer = activePlayer === 0 ? 1 : 0;
        // player1.classList.toggle('player--active');
        // player2.classList.toggle('player--active');

    });

    //Replay Event 

    btnNew.addEventListener('click',function(){
        scores[0] = 0;
        scores[1] = 0;
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
        currentScore = 0;
        activePlayer = 0;
        totalScore = 0;
        playing = true;
        // diceEl.classList.remove('hidden');
        modalWindow.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
        score0El.textContent = 0;
        score1El.textContent = 0;
        document.getElementById('current--0').textContent = 0;
        document.getElementById('current--1').textContent = 0;
        closeRules();
        diceEl.classList.add('hidden');
    })

    //Modal--window 

    modalClose.addEventListener('click', function(){
        modalWindow.classList.add('hidden');
    })

    //Modal--Window1

    btnRules.addEventListener('click', function(){
        document.querySelector('.modal--1').classList.remove('hidden');
        diceEl.classList.add('hidden');
    })

    document.querySelector('.closebtn').addEventListener('click',closeRules)


