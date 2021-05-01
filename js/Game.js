class Game {
    constructor() {
        this.missed = 0;
        this.phrase = ['i am never at home on Sundays',
                        'the river stole the gods',
                        'love is not like pizza',
                        'i am a living furnace',
                        'so long and thanks for the fish',
                        'the book is in front of the table'];
        this.activePhrase = null;
    }

    // hide overlay, choose a random phrase from this.phrase after display it.
    startGame(){
        document.querySelector('#overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        let newPhrase = new Phrase(this.activePhrase);
        newPhrase.addPhraseToDisplay();
    }

    // get random phrase
    getRandomPhrase() {
        return this.phrase[Math.floor(Math.random()* this.phrase.length)];
    }

    // buttons interaction with the random Phrase
    handleInteraction(target, input){
        const NewPheaseClass = new Phrase (this.activePhrase);  // use Phrase.js -> checkLetter function
        const letterLi = document.querySelectorAll('#qwerty button');
        

        // keyUp part
        if(input == 'keyUp') {
            if(this.activePhrase.includes(target)) { // if the letter is in phrase
                // check the which button pushed 
                for(let btn of letterLi) { 
                    if(btn.textContent == target) {
                        btn.classList.add('chosen');
                    }                    
                }
                NewPheaseClass.checkLetter(target);
                this.checkForWin()
            } else {
                for(let btn of letterLi) {
                    if(btn.textContent == target) {
                        // if push again the same wrong button it is not cost a life
                        if(!btn.classList.contains('wrong')) {
                            btn.classList.add('wrong');
                            this.removeLife()
                        }
                    }
                }
            } 
        }

        // click part
        if(input == 'click') {
            if(this.activePhrase.includes(target.textContent)) { // if true 
                target.classList.add('chosen');
                NewPheaseClass.checkLetter(target.textContent);
                this.checkForWin()
            } else {
                target.classList.add('wrong');
                this.removeLife()
            } 
        }               

    }

    // if miss one lose 1 health. (change the img src and +1 for missed)
    removeLife() {
        const hearth = document.querySelectorAll('#scoreboard li img');
        setTimeout(() => {  // => we need to add this because the keys animation still see when the game is end plus syncronized with wrong class animation 
            if(this.missed == 4) {
                this.gameOver('lose');
            } else {
                hearth[this.missed].src = 'images/lostHeart.png';
                this.missed += 1;
            }
        }, 1000);
        
    }

    // check the phrase letter numbers is equal with correct letters
    checkForWin(){
        const letterClass = document.querySelectorAll('.letter').length;
        const showClass = document.querySelectorAll('.show').length;
        if(letterClass == showClass) {
            this.gameOver('win');
        }
    }

    // when a game is over the message depends the passed value
    gameOver(msg) {
        const overLay = document.querySelector('#overlay');
        const h1 = document.querySelector('#game-over-message');
        const startBtn = document.querySelector('#overlay .text');
        overLay.style.display = 'block'
        if(msg == 'win') {
            overLay.classList.add('win');
            h1.innerHTML = 'Awesome, you are win. Greate Job!'; 
        } else {
            overLay.classList.add('lose');
            h1.innerHTML = "Oh no, you lost. Let's try it again."; 
        }
        startBtn.innerHTML = "Restart Game";
        startBtn.classList.add('reset-game');
    }
}

