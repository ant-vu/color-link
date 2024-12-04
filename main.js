const colors = ['red', 'blue', 'green', 'yellow'];
const board = document.getElementById('board');
const notification = document.getElementById('notification');

// Create 5x5 board using a loop
for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    const leftHalf = document.createElement('div');
    leftHalf.classList.add('half', 'left');

    const rightHalf = document.createElement('div');
    rightHalf.classList.add('half', 'right');

    cell.appendChild(leftHalf);
    cell.appendChild(rightHalf);
    board.appendChild(cell);
}

// Ensure there's a valid solution
const cells = document.querySelectorAll('.cell');
const firstCellIndex = Math.floor(Math.random() * cells.length);
let secondCellIndex;

do {
    secondCellIndex = Math.floor(Math.random() * cells.length);
} while (secondCellIndex === firstCellIndex);

const startingColor = colors[Math.floor(Math.random() * colors.length)];
notification.textContent = `Starting color: ${startingColor}`;

cells.forEach((cell, index) => {
    const leftHalf = cell.querySelector('.left');
    const rightHalf = cell.querySelector('.right');

    if (index === firstCellIndex) {
        rightHalf.style.backgroundColor = startingColor;
        leftHalf.style.backgroundColor = getRandomDifferentColor(startingColor);
        rightHalf.dataset.solution = 'true';
    } else if (index === secondCellIndex) {
        leftHalf.style.backgroundColor = startingColor;
        rightHalf.style.backgroundColor = getRandomDifferentColor(startingColor);
        leftHalf.dataset.solution = 'true';
    } else {
        const leftColor = getRandomDifferentColor('');
        leftHalf.style.backgroundColor = leftColor;
        rightHalf.style.backgroundColor = getRandomDifferentColor(leftColor);
    }
});

// Memorization phase
setTimeout(() => {
    cells.forEach((cell) => {
        const leftHalf = cell.querySelector('.left');
        const rightHalf = cell.querySelector('.right');

        leftHalf.dataset.color = leftHalf.style.backgroundColor;
        rightHalf.dataset.color = rightHalf.style.backgroundColor;

        leftHalf.style.backgroundColor = '';
        rightHalf.style.backgroundColor = '';

        leftHalf.textContent = '';
        rightHalf.textContent = '';
    });

    notification.textContent = "Memorization time's up! Select the matching cells.";
}, 5000);

// Interact with cells
let firstSelectedCell = null;
let secondSelectedCell = null;

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!firstSelectedCell) {
            firstSelectedCell = cell;
            cell.classList.add('selected');
        } else if (!secondSelectedCell) {
            secondSelectedCell = cell;
            cell.classList.add('selected');
            checkWin();
        }
    });
});

function getRandomDifferentColor(excludeColor) {
    let color;
    do {
        color = colors[Math.floor(Math.random() * colors.length)];
    } while (color === excludeColor);
    return color;
}

function checkWin() {
    const firstRightColor = firstSelectedCell.querySelector('.right').dataset.color;
    const secondLeftColor = secondSelectedCell.querySelector('.left').dataset.color;

    if (firstRightColor === startingColor && secondLeftColor === startingColor) {
        notification.textContent = "You won!";
    } else {
        notification.textContent = "Sorry, you lost! Try again.";
    }

    // Reset selections
    firstSelectedCell.classList.remove('selected');
    secondSelectedCell.classList.remove('selected');
    firstSelectedCell = null;
    secondSelectedCell = null;
}