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
        const NewPheaseClass = new Phrase (this.activePhrase);
        const letterLi = document.querySelectorAll('#qwerty button');
        

        if(input == 'keyUp') {
            if(this.activePhrase.includes(target)) { // if true 
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
                        if(!btn.classList.contains('wrong')) {
                            btn.classList.add('wrong');
                            this.removeLife()
                        }
                    }
                }
            } 
        }

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

    removeLife() {
        const hearth = document.querySelectorAll('#scoreboard li img');
        if(this.missed == 4) {
            this.gameOver('loss');
        } else {
            hearth[this.missed].src = 'images/lostHeart.png';
            this.missed += 1;
        }
    }

    checkForWin(){
        const letterClass = document.querySelectorAll('.letter').length;
        const showClass = document.querySelectorAll('.show').length;
        if(letterClass == showClass) {
            this.gameOver('win');
        }
    }

    gameOver(msg) {
        const overLay = document.querySelector('#overlay');
        const h1 = document.querySelector('#game-over-message');
        const startBtn = document.querySelector('#overlay button');
        overLay.style.display = 'block'
        if(msg == 'win') {
            overLay.classList.add('win');
            h1.innerHTML = 'Awesome, you are win. Greate Job!'; 
        } else {
            overLay.classList.add('loss');
            h1.innerHTML = "Oh no, you lost. Let's try it again."; 
        }
        startBtn.innerHTML = "Restart Game";
        startBtn.classList.add('reset-game');
    }
}

