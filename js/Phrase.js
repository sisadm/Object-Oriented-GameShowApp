class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    // create Li-element to every letter and sort out.
    addPhraseToDisplay() {
        let phraseContainer = document.querySelector('#phrase ul');
        
        for(let i = 0; i < this.phrase.length; i++) {
            if(this.phrase[i] === " ") {
                phraseContainer.insertAdjacentHTML('beforeend', `<li class="space">${this.phrase[i]}</li>`) ;
            } else { 
                phraseContainer.insertAdjacentHTML('beforeend', `<li class="hide letter">${this.phrase[i]}</li>`);
            }
        }
    }

    // check the passed value is in the Phrase if yes change class from hide to show
    checkLetter(btn){

        for(let i = 0; i < this.phrase.length; i++) {
            if(this.phrase[i] == btn) {
                this.showMatchedLetters(document.querySelectorAll('#phrase li')[i]);  
            }
        }
    }

    // class change.
    showMatchedLetters(letter) {
        letter.classList.remove('hide');
        letter.classList.add('show');
    }





}