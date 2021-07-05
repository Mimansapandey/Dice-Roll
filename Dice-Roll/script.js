'use strict';
//Selecting
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

//storing values of total scores.
const scores = [0,0];

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

//setting up the starting values
let currentScore = 0;
let activePlayer = 0;
let totalScore = 0;
let playing = true;

//Buttons
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//Modal
const modalWindow = document.querySelector('.modal');
const modalWinner = document.querySelector('.winner');
const modalClose = document.querySelector('.close');

//display values
score0El.textContent = 0;
score1El.textContent = 0;

//switching player
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
     currentScore = 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');   
}

diceEl.classList.add('hidden');

//Die Roll Event
btnRoll.addEventListener('click',function(){

    if(playing){
     const diceroll = Math.trunc(Math.random()*6)+1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceroll}.png`; 
        
    //displaying the current score
    if (diceroll !== 1){
        currentScore += diceroll;
   
        //displaying the current score 
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        

    //switching player
    }else {
    
        switchPlayer();
    }
}
});
    
    btnHold.addEventListener('click', function(){
        
        if (playing){
            
    // scores[activePlayer] += currentScore;
        // document.getElementById(`score--${activePlayer}`).textContent =
        // scores[activePlayer];
            
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

        if(scores[activePlayer] >= 50) {
            
            diceEl.classList.add('hidden');
            
            playing = false;
            
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            modalWinner.textContent = `Player ${activePlayer +1 } Wins! 🥳`;
            
            modalWindow.classList.remove('hidden');
            
            //switching players
        }else{
            
            switchPlayer();  
        }
       
        }
        //1. Adding the current score to the active players score.
        
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
    })

    //Closing Modal

    modalClose.addEventListener('click', function(){
        modalWindow.classList.add('hidden');
    })


