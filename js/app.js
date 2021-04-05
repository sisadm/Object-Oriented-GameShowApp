const overlay = document.querySelector('#overlay');
const qwerty = document.querySelector('#qwerty');
let newGame;


overlay.addEventListener('click', (e) => {
    if(e.target.tagName == 'BUTTON') {

        if(e.target.classList.contains('reset-game')){
            const phraseLi = document.querySelectorAll('#phrase li');
            const hearthImg = document.querySelectorAll('#scoreboard img');
            const qwertyBtn = document.querySelectorAll('#qwerty button');

            // remove class which added when game is end
            e.target.classList.remove('reset-game');

            // clear old phrase Li
            for(let li of phraseLi) {
                li.remove();
            }

            // change hearth img src back to normal
            for(let img of hearthImg) {
                img.src = 'images/liveHeart.png';
            }

            // remove the additionals btn classes 
            for(let btn of qwertyBtn) {
                btn.classList.remove('chosen') ||
                btn.classList.remove('wrong');
            }

        }

        if(e.target.textContent == 'Start Game') {
            newGame = new Game();
            newGame.startGame();
        }
    }
})

qwerty.addEventListener('click', (e) => {
    if(e.target.classList == 'key') {
        newGame.handleInteraction(e.target);
    }
})