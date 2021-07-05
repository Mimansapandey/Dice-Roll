'use strict';
//Initially, the scores for both the players should be 0 and the dice should be hidden
//selecting the elements responsible for setting scores and setting them to zero
//El stands for element, stating that it is in fact a DOM element and not the score itself
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
//selecting the dice image element to set it to hidden
const diceEl = document.querySelector('.dice');
//create a hidden class in the css file to add or remove it from the classlist as required

//storing the values of both total scores in an array
const scores = [0,0];

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
//setting up the current score
let currentScore = 0;
let activePlayer = 0;
let totalScore = 0;
let playing = true;

//selecting the buttons to add eventhandlers 
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
//modal class
const modalWindow = document.querySelector('.modal');
//Modal Text
const modalWinner = document.querySelector('.winner')
//close button from modal window
const modalClose = document.querySelector('.close');
//setting the textcontent values of both the score to zero
score0El.textContent = 0;
score1El.textContent = 0;
//adding the hidden class to the class dice to set display to none

//switch player function
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
     currentScore = 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');   
}

diceEl.classList.add('hidden');
//roll dice event
btnRoll.addEventListener('click',function(){

    if(playing){

     //generating a random number between 1-6 and truncating it.
     const diceroll = Math.trunc(Math.random()*6)+1;

    diceEl.classList.remove('hidden');
   
    //we use src for selecting an image 
    diceEl.src = `dice-${diceroll}.png`; 
    //using an if else statement to display the current score
    if (diceroll !== 1){
        currentScore += diceroll;
        //dynamically allocating a dice image to be displayed after a diceroll

        //displaying the current score 
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        //switching players if the dice rolled is a 1


    }else {
        //switching player
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

        if(scores[activePlayer] >= 20) {
            diceEl.classList.add('hidden');
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

            modalWinner.textContent = `Player ${activePlayer +1 } Wins! 🥳`;
            
            modalWindow.classList.remove('hidden');
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

    //replay event 

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
    //modal window close button event

    modalClose.addEventListener('click', function(){
        modalWindow.classList.add('hidden');
    })


