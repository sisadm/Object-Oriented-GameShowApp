class Game {
    constructor() {
        this.missed = 0;
        this.phrase = ['I am never at home on Sundays',
                        'The river stole the gods',
                        'Love is not like pizza',
                        'I’m a living furnace',
                        'So long and thanks for the fish',
                        'The book is in front of the table'];
        this.activePhrase = null;
    }

    startGame(){

    }

    getRandomPhrase() {
        return this.phrase[Math.floor(Math.random()* this.phrase.length)];
    }
}

const a = new Game();

a.getRandomPhrase();

