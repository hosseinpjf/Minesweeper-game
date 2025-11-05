const container = document.getElementsByClassName('container')[0];

document.addEventListener('DOMContentLoaded', () => {
    createBoxes();
    creatingRandomBombs();
    bombRoundNumbers();
    clickHandler();
    console.log(container.querySelectorAll('.bomb').length);
});

function createBoxes() {
    for (let index = 0; index < 64; index++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.setAttribute('data-number', 0)
        container.appendChild(box);
    }
}

function creatingRandomBombs() {
    let numbersRandom = [];
    for (let index = 0; index < 15; index++) {
        let numberRandom = Math.floor(Math.random() * 65);
        if (!numbersRandom.includes(numberRandom)) {
            numbersRandom.push(numberRandom)
        }
        else {
            index--;
        }
    }
    try {
        numbersRandom.forEach(index => {
            container.children[index].classList.add('bomb');
        })
    } catch (error) {
        console.log(error);
        location.reload();
    }
}

function bombRoundNumbers() {
    const numbers = [-9, -8, -7, -1, 1, 7, 8, 9];
    Array.from(container.children).forEach((box, index) => {
        if (box.classList.contains('bomb')) {
            numbers.forEach(element => {
                const neighbor = index + element;

                if ((index % 8 === 0) && (element === -1 || element === 7 || element === -9)) return;
                if (((index + 1) % 8 === 0) && (element === 1 || element === -7 || element === 9)) return;
                if ((neighbor) < 0 || (neighbor) >= 64) return;

                const target = container.children[neighbor];
                if (target) {
                    target.dataset.number = String(Number(target.dataset.number) + 1);
                }
            });
        }
    })
}

function clickHandler() {
    Array.from(container.children).forEach((box, index) => {
        box.addEventListener('click', () => {
            if (box.classList.contains('bomb')) {
                box.classList.add('showBomb');
                endGame();
            }
            else {
                if (box.dataset.number == 0) {
                    zeroBoxes(index);
                }
                else {
                    box.textContent = box.dataset.number;
                }
                box.classList.add('showNumber');
            }
        })
    })
}


function zeroBoxes(index) {
    const numbers = [-9, -8, -7, -1, 1, 7, 8, 9];
    const targets = [index];

    let i = 0;
    while (i < targets.length) {
        numbers.forEach(element => {
            const neighbor = targets[i] + element;

            if ((targets[i] % 8 === 0) && (element === -1 || element === 7 || element === -9)) return;
            if (((targets[i] + 1) % 8 === 0) && (element === 1 || element === -7 || element === 9)) return;
            if ((neighbor) < 0 || (neighbor) >= 64) return;

            const target = container.children[neighbor];
            if (target) {
                target.classList.add('showNumber');

                if (target.dataset.number != 0) {
                    target.textContent = target.dataset.number;
                }

                if (target.dataset.number == 0 && !targets.includes(neighbor)) {
                    targets.push(neighbor);
                }
            }
        })
        i++;
    }
}

function endGame() {
    container.classList.add('endGame');
}

document.getElementsByClassName('btnAgain')[0].addEventListener('click', () => {
    Array.from(container.children).forEach(box => { 
        box.className = 'box';
        box.dataset.number = 0;
    })
    creatingRandomBombs();
    bombRoundNumbers();
    container.classList.remove('endGame');
    
    console.log(container.querySelectorAll('.bomb').length);
})