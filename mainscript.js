//retrieving the items for DOM manipulation
const result = document.querySelector('#result')
const playagain = document.querySelector('#button')
const message = document.querySelector('#message')

// variables
let isgameactive = true
let current_player = "x"

// we'll add whatever the two players click accordind to data-index
let board = ["","","","","","","","",""]

// here we'll define the functions fo rhandling the 'x' or 'o' onclicking them

const boxes = document.querySelectorAll('.box')

boxes.forEach(box => box.addEventListener('click', handleclicks))

function handleclicks(currentbox_event){
    const currentbox = currentbox_event.target;
    const currentbox_index = parseInt(currentbox.getAttribute('data-index'))
    
    if (board[currentbox_index] != "" || !isgameactive) return

    playing_logic(currentbox, currentbox_index)
}

function playing_logic(currentbox, currentbox_index){
    board[currentbox_index] = current_player;
    currentbox.textContent = current_player;
    finding_result()
}

// if the values in these indices are same then we can declare the winner
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function finding_result(){
    let won = false
    for (let i = 0; i<= 7; i++){
        // start from the first arrray in the possible winning conditions
        const current_condition = winningConditions[i]

        // assign each element in the array respective to three values
        let [first, second, third] = current_condition.map(index => board[index])
        // used map method to reduce the number of lines
        
        if (first === '' || second === '' || third === '') continue

        if (first === second && second === third) {
            won = true
            break
        }
    }
    if (won){
        message.textContent = `${current_player} wins`
        isgameactive = false
        result.style.visibility = "visible";
        return
    }

    let draw = !board.includes(''); // if there are no other empty boxes to fill out 
    if (draw){
        message.textContent = `It's a draw`
        isgameactive = false
        result.style.visibility = "visible";
        return
    }

    playerchange()
}

function playerchange(){
    current_player = current_player === "x" ? "o" : "x"
}

playagain.onclick = () => {
    window.location.reload();
}