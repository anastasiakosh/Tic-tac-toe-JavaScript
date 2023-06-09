const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const startСells = [
    " ", " ", " ", " ", " ", " "," ", " ", " ",
]
let go = "circle"
infoDisplay.textContent = "Circle goes first"

function createBoard(){
    startСells.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })
}
let gameOver = false;

createBoard()

function addGo(e) {
    if (gameOver) return; // Проверяем, не завершена ли игра уже
    
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go == "circle" ? "cross" : "circle"
    infoDisplay.textContent = "It is now " + go + "'s go."
    e.target.removeEventListener("click", addGo)
    checkScore()
  }
  
  function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ]
  
    winningCombos.forEach(array => {
      const circleWins = array.every(cell => 
        allSquares[cell].firstChild?.classList.contains('circle'))
  
      if (circleWins) {
        infoDisplay.textContent = "Circle Wins!"
        gameOver = true; // Устанавливаем значение переменной gameOver в true, чтобы предотвратить дальнейшие ходы
        return;
      }
    })
  
    winningCombos.forEach(array => {
      const crossWins = array.every(cell => 
        allSquares[cell].firstChild?.classList.contains('cross'))
  
      if (crossWins) {
        infoDisplay.textContent = "Cross Wins!"
        gameOver = true; // Устанавливаем значение переменной gameOver в true, чтобы предотвратить дальнейшие ходы
        return;
      }
    })
  }
  