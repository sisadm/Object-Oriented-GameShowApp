class Game {
    constructor() {
        this.missed = 0;
        this.phrase = [
                        new Phrase('i am never at home on sundays'),
                        new Phrase('the river stole the gods'),
                        new Phrase('love is not like pizza'),
                        new Phrase('i am a living furnace'),
                        new Phrase('so long and thanks for the fish'),
                        new Phrase('the book is in front of the table')];
        this.activePhrase = null;
    }

    // hide overlay, choose a random phrase from this.phrase after display it.
    startGame(){
        document.querySelector('#overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    // get random phrase
    getRandomPhrase() {
        console.log(this.phrase[(Math.floor(Math.random()* Object.keys(this.phrase).length))]);
        return this.phrase[(Math.floor(Math.random()* Object.keys(this.phrase).length)  )];
        
    }

    // buttons interaction with the Phrase
    handleInteraction(target, choose){
        let text = (choose == "click") ? target.innerHTML : target.key;
        const liPhrase = document.querySelectorAll('#phrase li');
        let liKeys = document.querySelectorAll('#qwerty button');
        
        if(this.activePhrase.checkLetter(text) ){ // if the letter is exist 

            // with click
            if(choose == 'click') { 
                target.classList.add('chosen');
                for(const li of liPhrase) {
                    if(li.innerText == text) {
                        this.activePhrase.showMatchedLetters(li);
                    }
                }    
                
            }

            // with keyUp
            if(choose == 'keyUp') {
                for(const key of liKeys){
                    if(text == key.innerText){
                        key.classList.add('chosen');
                    } 
                }
                for(const li of liPhrase) {
                    if(li.innerText == text) {
                        this.activePhrase.showMatchedLetters(li);
                    }
                }
                //if(this.checkForWin() == true) setTimeout( () => this.gameOver('win'), 1700);
            }
            
        }

        // setTimeout() wait for letter animation
        else {
            if(choose == 'keyUp') {
                for(const key of liKeys){
                    if(text == key.innerText){
                        key.classList.add('wrong');
                    } 
                }
                setTimeout(() => this.removeLife(), 900);
            }
            else {
                target.classList.add('wrong');
                setTimeout(() => this.removeLife(), 900);
            }
            
        }
        
        if(this.checkForWin()) {
            setTimeout(() => this.gameOver('win'), 1300);
        }                      
    }

    // change a hearth img source when you miss a letter
    removeLife() {
        const hearth = document.querySelectorAll('#scoreboard li img');
        if(this.missed == 4) {
            hearth[this.missed].src = 'images/lostHeart.png';
            setTimeout(() => this.gameOver('loss'), 500);
        } else {
            hearth[this.missed].src = 'images/lostHeart.png';
            this.missed += 1;
        }
    }

    // check the letter numbers is equal with the right chosen letters
    checkForWin(){
        const letterClass = document.querySelectorAll('.letter').length;
        const showClass = document.querySelectorAll('.show').length;
        console.log(letterClass == showClass);
        if(letterClass == showClass) {
            return true;
        }
    }

    // gameOver with different end win or loss
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

        startBtn.classList.add('reset-game');
    }
}