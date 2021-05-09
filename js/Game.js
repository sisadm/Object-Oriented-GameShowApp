class Game {
    constructor() {
        this.missed = 0;
        this.phrase = {
                        1: new Phrase('i am never at home on Sundays'),
                        2: new Phrase('the river stole the gods'),
                        3: new Phrase('love is not like pizza'),
                        4: new Phrase('i am a living furnace'),
                        5: new Phrase('so long and thanks for the fish'),
                        6: new Phrase('the book is in front of the table')};
        this.activePhrase = null;
    }

    // hide overlay, choose a random phrase from this.phrase after display it.
    startGame(){
        //document.querySelector('#overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        console.log(this.activePhrase)
        console.log(Object.values(this.activePhrase).includes('a'));
        this.activePhrase.addPhraseToDisplay();
        
        // this.activePhrase = this.getRandomPhrase();
        // console.log(this.missed);
        // let newPhrase = new Phrase(this.activePhrase);
        // this.activePhrase.addPhraseToDisplay();
    }

    // get random phrase
    getRandomPhrase() {
        return this.phrase[(Math.floor(Math.random()* Object.keys(this.phrase).length) + 1)];
    }

    // buttons interaction with the random Phrase
    handleInteraction(target){
        // const phrase = Array.from(document.querySelectorAll('#phrase li'));
        // const phraseLetters = phrase.map(i => i.textContent); // separete text from the Li
        const NewPheaseClass = new Phrase (this.activePhrase);
        const liPhrase = document.querySelectorAll('#phrase li');
        
                
        if(this.activePhrase.includes(target.textContent)) { // if true 
            target.classList.add('chosen');
            NewPheaseClass.checkLetter(target.textContent);
            this.checkForWin()
        } else {
            target.classList.add('wrong');
            this.removeLife()
        }                
            
        


        // qwerty.addEventListener('click', (e) => {
        //     if(e.target.tagName == 'BUTTON'){
        //         if(phraseLetters.includes(e.target.textContent)) { // if true 
        //             e.target.classList.add('chosen');
        //             NewPheaseClass.checkLetter(e.target.textContent);
        //             this.checkForWin()
        //         } else {
        //             e.target.classList.add('wrong');
        //             this.removeLife()
        //         }
                
        //     }
        // })
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

        startBtn.classList.add('reset-game');
    }
}