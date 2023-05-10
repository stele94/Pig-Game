/*
The game of Pig is a very simple dice game in which two players race to reach 100 points. Each turn, a player repeatedly rolls a die until either a 1 is rolled or the player holds and scores the sum of the rolls (i.e. the turn total). At any time during a player's turn, the player is faced with two decisions:
roll - If the player rolls a
1: the player scores nothing and it becomes the opponent's turn.
2 - 6: the number is added to the player's turn total and the player's turn continues.
hold - The turn total is added to the player's score and it becomes the opponent's turn.
*/

class Cube {

    constructor() {
        this.diceEl = document.querySelector('.dice');
        this.currentScore = 0;
        this.diceNum = 0;
        this.hideDice();
    }

    rollDice() {

        this.diceNum = Math.trunc(Math.random() * 6) + 1;
        this.currentScore += this.diceNum;
        this.diceEl.src = `./imgs/dice-${this.diceNum}.png`;
        this.diceEl.classList.remove('hidden');

    }

    hideDice() {
        this.diceEl.classList.add('hidden');
    }

}

class App {
    constructor() {

        this.init();
        // Roll dice
        this.rollBtn.addEventListener('click', this.rollCondition);
        // Hold score
        this.holdBtn.addEventListener('click', this.holdScore);
        // Start a new game
        this.newGameBtn.addEventListener('click', this.init);
    }

    rollCondition = () => {

        if (this.gameOn) {
            this.cube.rollDice();
            if (this.cube.diceNum != 1) {
                document.querySelector(`#current--${this.activePlayer}`).textContent = this.cube.currentScore;

            } else {
                this.switchPlayer()
            }
        }

    }

    switchPlayer() {

        this.cube.currentScore = 0;
        document.querySelector(`#current--${this.activePlayer}`).textContent = this.cube.currentScore;
        this.activePlayer = this.activePlayer === 0 ? 1 : 0;
        document.querySelector(`.player--0`).classList.toggle('player--active');
        document.querySelector(`.player--1`).classList.toggle('player--active');
    }

    holdScore = () => {

        if (this.gameOn) {

            this.score[this.activePlayer] += this.cube.currentScore;
            document.querySelector(`#score--${this.activePlayer}`).textContent = this.score[this.activePlayer];

            if (this.score[this.activePlayer] >= 20) {
                document.querySelector(`.player--${this.activePlayer}`).classList.remove('player--active');

                document.querySelector(`.player--${this.activePlayer}`).classList.add('player--winner');
                this.gameOn = false;

            } else {

                this.switchPlayer();
            }
        }

    }

    init = () => {
        // Players buttons
        this.rollBtn = document.querySelector('.btn--roll');
        this.holdBtn = document.querySelector('.btn--hold');
        this.newGameBtn = document.querySelector('.btn--new');
        this.activePlayer = 0;
        this.score = [0, 0];
        this.gameOn = true;

        // Make a new cube
        this.cube = new Cube()

        // Players current scores
        this.currentEl = document.querySelector('#current--0');
        this.currentE2 = document.querySelector('#current--1');

        // Reset scores
        this.currentEl.textContent = 0;
        this.currentE2.textContent = 0;


        // Players score
        this.player1Score = document.querySelector('#score--0');
        this.player2Score = document.querySelector('#score--1');

        this.player1Score.textContent = 0;
        this.player2Score.textContent = 0;

        //Players sections
        this.player1Section = document.querySelector('.player--0');
        this.player2Section = document.querySelector('.player--1');

        // Remove winner class
        document.querySelector(`.player--0`).classList.remove('player--winner');
        document.querySelector(`.player--1`).classList.remove('player--winner');

        // Set active class to the first player
        this.player1Section.classList.add('player--active');
        this.player2Section.classList.remove('player--active');
    }

}

new App();


