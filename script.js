class CrosswordGame {
    constructor() {
        this.grid = [];
        this.selectedCell = null;
        this.initializeGrid();
        this.setupEventListeners();
        this.renderGrid();
    }

    initializeGrid() {
        this.grid = Array(8).fill().map(() => Array(8).fill(''));
        
        this.gridPattern = [
            ['', '', '', 'orange-1', '', '', '', ''],
            ['', '', '', 'A', '', '', '', ''],
            ['', '', 'green-3', 'A', 'A', 'A', 'A', 'green-5'],
            ['', '', '', 'A', '', '', '', 'A'],
            ['', '', '', 'A', '', '', '', 'A'],
            ['', '', '', 'A', '', '', '', 'A'],
            ['green-6', 'A', 'A', 'A', 'A', '', '', 'A'],
            ['', '', '', '', '', '', '', 'A']
        ];
    }

    renderGrid() {
        const gridContainer = document.getElementById('crosswordGrid');
        gridContainer.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                const pattern = this.gridPattern[row][col];
                
                if (pattern) {
                    cell.classList.add('filled');
                    
                    if (pattern.includes('orange')) {
                        cell.classList.add('orange-circle');
                        cell.textContent = 'A';
                        
                        const number = document.createElement('div');
                        number.className = 'cell-number';
                        number.textContent = pattern.split('-')[1];
                        cell.appendChild(number);
                    } else if (pattern.includes('green')) {
                        cell.classList.add('green-circle');
                        cell.textContent = 'A';
                        
                        const number = document.createElement('div');
                        number.className = 'cell-number';
                        number.textContent = pattern.split('-')[1];
                        cell.appendChild(number);
                    } else if (pattern === 'A') {
                        cell.textContent = 'A';
                    }
                }

                gridContainer.appendChild(cell);
            }
        }
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('grid-cell')) {
                this.selectCell(e.target);
            }
        });

        const keyboard = document.getElementById('keyboard');
        keyboard.addEventListener('click', (e) => {
            if (e.target.classList.contains('keyboard-key')) {
                const key = e.target.textContent;
                this.handleKeyPress(key);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key.match(/[a-zA-Z]/)) {
                this.handleKeyPress(e.key.toUpperCase());
            } else if (e.key === 'Backspace') {
                this.handleKeyPress('⌫');
            } else if (e.key === 'Escape') {
                this.hideKeyboard();
            }
        });

        document.querySelector('.close-btn').addEventListener('click', () => {
            this.handleClose();
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.keyboard') && !e.target.classList.contains('grid-cell')) {
                this.hideKeyboard();
            }
        });
    }

    selectCell(cell) {
        document.querySelectorAll('.grid-cell').forEach(c => {
            c.style.boxShadow = '';
        });

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const pattern = this.gridPattern[row][col];

        if (pattern && !pattern.includes('orange') && !pattern.includes('green')) {
            this.selectedCell = cell;
            cell.style.boxShadow = '0 0 0 2px #4A90E2 inset';
            this.showKeyboard();
        } else if (pattern === '') {
            this.selectedCell = cell;
            cell.style.boxShadow = '0 0 0 2px #4A90E2 inset';
            this.showKeyboard();
        }
    }

    handleKeyPress(key) {
        if (!this.selectedCell) return;

        const row = parseInt(this.selectedCell.dataset.row);
        const col = parseInt(this.selectedCell.dataset.col);
        const pattern = this.gridPattern[row][col];

        if (key === '⌫') {
            if (!pattern.includes('orange') && !pattern.includes('green')) {
                this.selectedCell.textContent = '';
                this.grid[row][col] = '';
            }
        } else if (key.length === 1 && key.match(/[A-Z]/)) {
            if (!pattern.includes('orange') && !pattern.includes('green')) {
                this.selectedCell.textContent = key;
                this.grid[row][col] = key;
                this.moveToNextCell();
            }
        }
    }

    moveToNextCell() {
        if (!this.selectedCell) return;

        const row = parseInt(this.selectedCell.dataset.row);
        const col = parseInt(this.selectedCell.dataset.col);

   
        for (let nextCol = col + 1; nextCol < 8; nextCol++) {
            const pattern = this.gridPattern[row][nextCol];
            if (pattern && !pattern.includes('orange') && !pattern.includes('green')) {
                const nextCell = document.querySelector(`[data-row="${row}"][data-col="${nextCol}"]`);
                if (nextCell) {
                    this.selectCell(nextCell);
                    return;
                }
            }
        }

       
        for (let nextRow = row + 1; nextRow < 8; nextRow++) {
            for (let nextCol = 0; nextCol < 8; nextCol++) {
                const pattern = this.gridPattern[nextRow][nextCol];
                if (pattern && !pattern.includes('orange') && !pattern.includes('green')) {
                    const nextCell = document.querySelector(`[data-row="${nextRow}"][data-col="${nextCol}"]`);
                    if (nextCell) {
                        this.selectCell(nextCell);
                        return;
                    }
                }
            }
        }
    }

    showKeyboard() {
        document.getElementById('keyboard').classList.add('active');
    }

    hideKeyboard() {
  
        document.querySelectorAll('.grid-cell').forEach(c => {
            c.style.boxShadow = '';
        });
       
        document.querySelectorAll('.answer-box').forEach(b => {
            b.classList.remove('selected');
        });
        this.selectedCell = null;
    }

    handleClose() {
        if (confirm('Are you sure you want to exit the game?')) {
            console.log('Game closed');
        }
    }

    checkSolution() {
      
        console.log('Checking solution...');
    }

    getHint() {
  
        console.log('Providing hint...');
    }

    resetGame() {
        // Method to reset the game state
        this.grid = Array(8).fill().map(() => Array(8).fill(''));
        this.selectedCell = null;
        this.renderGrid();
        this.hideKeyboard();
    }
}


class GameTimer {
    constructor() {
        this.seconds = 44;
        this.timerElement = document.querySelector('.timer');
        this.start();
    }

    start() {
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    tick() {
        const minutes = Math.floor(this.seconds / 60);
        const secs = this.seconds % 60;
        this.timerElement.textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;
        this.seconds++;
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    reset() {
        this.seconds = 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
 
    const game = new CrosswordGame();
    

    const timer = new GameTimer();

    window.crosswordGame = game;
    window.gameTimer = timer;
    
 
    console.log('Crossword game initialized');
    console.log('Use crosswordGame and gameTimer objects for debugging');
});
 function handleRetry() {
         
            console.log('Retry clicked');
            
           
            const feedbackSection = document.querySelector('.feedback-section');
            feedbackSection.style.transform = 'translateY(100%)';
            
            setTimeout(() => {
               
                feedbackSection.style.transform = 'translateY(0)';
            }, 300);
        }

        f
            console.log('Continue clicked');
     
            const questionNumber = document.querySelector('.question-number');
            const currentQ = parseInt(questionNumber.textContent.split('/')[0]);
            
            if (currentQ < 5) {
                questionNumber.textContent = `${currentQ + 1}/5`;
                
         
                const progressFill = document.querySelector('.progress-fill');
                const newWidth = (currentQ + 1) * 32; 
                progressFill.style.width = `${newWidth}px`;
                
               
                const feedbackSection = document.querySelector('.feedback-section');
                feedbackSection.style.transform = 'translateY(100%)';
                
                setTimeout(() => {
                    feedbackSection.style.transform = 'translateY(0)';
                }, 500);
            }
        

    
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });

     
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                document.querySelector('.feedback-section').style.opacity = '1';
            }, 100);
        });