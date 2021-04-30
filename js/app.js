const overlay = document.querySelector('#overlay');
const qwerty = document.querySelector('#qwerty');
const body = document.querySelector('body');
let newGame;


overlay.addEventListener('click', (e) => {
    if(e.target.tagName == 'BUTTON' || 'SPAN') { // -> also need SPAN because Z-index is bigger 

        // check the user finish a game and want a new one.
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

        if(e.target.textContent == 'Start Game' || e.target.textContent == 'Restart Game') {
            newGame = new Game();
            newGame.startGame();
        }
    }
})

body.addEventListener('keyup', (e) => {

    // without this if statement you can type when a game is not started so error message pop up 
    if(overlay.style.display == 'none') { 
        newGame.handleInteraction(e.key, 'keyUp');
    }
    
})

qwerty.addEventListener('click', (e) => {
    if(e.target.classList == 'key') {
        newGame.handleInteraction(e.target, 'click');
    }
})

