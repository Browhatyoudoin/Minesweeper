
let tiles = {}
let locations = []
let bomb = false;
let win = false;
let lose = false;
let mineCount = 10;
let markedTiles = 0;
const minesLeftText = document.querySelector('[data-mine-count]')
minesLeftText.textContent = mineCount;

const parent = document.getElementById('grid-parent');
console.log(parent);

for (let i = 1; i<=100; i++) {
    tiles[`object${i}`] =  {
        number: i,
        isFlag: false,
        isRevealed: false,
        isBomb: false
    }
    // let tempArray = [];
    // for (let j = 0; j<10; j++) {
    //     tempArray.push(
    //         {
    //             number: (i*10)+j+1,
    //             boolean: false;
    //         }
    //     )
    // }
}

for (let i = 0; i < 10; i++) {
    let a = Math.floor(1 + Math.random() * 100);
    locations.push(a);
    tiles[`object${a}`].isBomb = true;
}

for (let i = 1; i<=100; i++) {
    let newButton = document.createElement('button');
    newButton.textContent = nearbyBomb(tiles[`object${i}`]);
    newButton.classList.add('hidden');
    parent.appendChild(newButton);

    newButton.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        if (newButton.className == 'visible') {
            return;
        }
        if (tiles[`object${i}`].isFlag == true) {
            newButton.className = 'hidden';
            tiles[`object${i}`].isFlag = false;
            markedTiles++;
        } else {
            newButton.className = 'flag';
            tiles[`object${i}`].isFlag = true;
            markedTiles--;
        }
    }
    )
    newButton.addEventListener('click', function(event) {
        console.log(nearbyBomb(tiles[`object${i}`]));
        let buttonNumber = tiles[`object${i}`].number;

        if (locations.includes(buttonNumber)) {
            lose = true; 
            newButton.className = 'mine';
            
        } else {
            
            if (newButton.className == 'hidden') {
                newButton.className = 'visible';
            }
        }
    }
    )
    minesLeftText.textContent = mineCount-markedTiles;
    if (lose) {
        break;
    }
}
if (!lose) {
    win = true;
}
if (win) {
    console.log('you win!');
} else {
    console.log('you lose :(');
}

// function nearbyTiles(tile) {
//     if (tile%10 == 1 || tile <= 10 || tile%10 == 0 || tile>90) {
        
//     } else {
//         for (let i = 0; i<9; i++) {

//         }
//     }
// }

function nearbyBomb(tile) {
        let bombCount = 0;
        const tileNumber = tile.number;
        const row = Math.ceil(tileNumber / 10);
        const col = tileNumber % 10 === 0 ? 10 : tileNumber % 10;
    
        //topleft
        if (row > 1 && col > 1 && locations.includes(tileNumber - 11)) {
            bombCount++;
        }
        //top
        if (row > 1 && locations.includes(tileNumber - 10)) {
            bombCount++;
        }
        //topright
        if (row > 1 && col < 10 && locations.includes(tileNumber - 9)) {
            bombCount++;
        }
        //left
        if (col > 1 && locations.includes(tileNumber - 1)) {
            bombCount++;
        }
        //right
        if (col < 10 && locations.includes(tileNumber + 1)) {
            bombCount++;
        }
        //bottomleft
        if (row < 10 && col > 1 && locations.includes(tileNumber + 9)) {
            bombCount++;
        }
        //bottom
        if (row < 10 && locations.includes(tileNumber + 10)) {
            bombCount++;
        }
        //bottomright
        if (row < 10 && col < 10 && locations.includes(tileNumber + 11)) {
            bombCount++;
        }
    
        return bombCount;
    }
    
    
    function openTiles(tile) {
        const tileNumber = tile.number;
        const row = Math.ceil(tileNumber / 10);
        const col = tileNumber % 10 === 0 ? 10 : tileNumber % 10 === 0 ? 10 : tileNumber % 10;
    
        revealTile(tile);

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 1 && newRow <= 10 && newCol >= 1 && newCol <= 10) {
                    const adjacentTile = tiles[`object${(newRow - 1) * 10 + newCol}`];
                    if (!adjacentTile.isRevealed && nearbyBomb(adjacentTile) === 0) {
                        openTiles(adjacentTile);
                    }
                }
            }
        }
    }
    
    function revealTile(tile) {
        const button = document.querySelector(`button[data-number="${tile.number}"]`);
        if (button) {
            button.classList.remove('hidden');
            button.classList.add('visible');
            tile.isRevealed = true;
        }
    }

    // function generateTiles() {
    
    // }
    