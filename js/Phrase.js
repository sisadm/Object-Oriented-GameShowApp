class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

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

    checkLetter(btn){
        for (const li of document.querySelectorAll('#phrase li')) {
            if (li.textContent.includes(btn)) {
              console.log(li)
            } else {
                // lost health
            }
          }
        
    }
}

const P1 = new Phrase('azta mindenit neki');



P1.addPhraseToDisplay();
P1.checkLetter('a');