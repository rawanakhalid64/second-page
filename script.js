



         const gridData = {
          
            '1-4': { letter: 'A', type: 'orange-letter', number: 1, numberColor: 'orange' },
            '1-9': { letter: 'A', type: 'green-letter', number: 2, numberColor: 'green' },
            
            
            '2-3': { letter: 'A', type: 'green-letter', number: 3, numberColor: 'green' },
            '2-4': { letter: 'A', type: 'green-letter' },
            '2-5': { letter: 'A', type: 'green-letter' },
            '2-6': { letter: 'A', type: 'green-letter' },
            '2-7': { letter: 'A', type: 'green-letter' },
            '2-8': { letter: 'A', type: 'green-letter' },
            '2-9': { letter: 'A', type: 'green-letter', number: 5, numberColor: 'green' },
            
            
            '3-4': { letter: 'A', type: 'orange-letter' },
            '4-4': { letter: 'A', type: 'orange-letter' },
            '5-4': { letter: 'A', type: 'orange-letter' },
            '6-4': { letter: 'A', type: 'orange-letter' },
            '7-4': { letter: 'A', type: 'orange-letter' },
            
           
            '7-1': { letter: 'A', type: 'orange-letter', number: 6, numberColor: 'orange' },
            '7-2': { letter: 'A', type: 'orange-letter' },
            '7-3': { letter: 'A', type: 'orange-letter' },
            '7-5': { letter: 'A', type: 'orange-letter' },
            
            // Column going down from row 2, column 9
            '3-9': { letter: 'A', type: 'green-letter' },
            '4-9': { letter: 'A', type: 'green-letter' },
            '5-9': { letter: 'A', type: 'green-letter' },
            '6-9': { letter: 'A', type: 'green-letter' },
            '7-9': { letter: 'A', type: 'green-letter' },
            '8-9': { letter: 'A', type: 'green-letter' },
        };

        function createGrid() {
            const grid = document.getElementById('grid');
            
            // Create 100 cells (10x10 grid)
            for (let row = 1; row <= 10; row++) {
                for (let col = 1; col <= 10; col++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    
                    const key = `${row}-${col}`;
                    if (gridData[key]) {
                        const data = gridData[key];
                        cell.textContent = data.letter;
                        cell.classList.add('filled', data.type);
                        
                        // Add circular border and number if specified
                        if (data.number) {
                            // Create circular border element
                            const circularBorder = document.createElement('div');
                            circularBorder.className = `circular-border ${data.numberColor}`;
                            cell.appendChild(circularBorder);
                            
                            // Create number element
                            const numberElement = document.createElement('div');
                            numberElement.className = `cell-number ${data.numberColor}`;
                            numberElement.textContent = data.number;
                            cell.appendChild(numberElement);
                        }
                    }
                    
                    grid.appendChild(cell);
                }
            }
        }

        // Initialize the grid when the page loads
        document.addEventListener('DOMContentLoaded', createGrid);

        // Add some interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            const cells = document.querySelectorAll('.cell.filled');
            
            cells.forEach(cell => {
                cell.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.1)';
                    this.style.transition = 'transform 0.2s ease';
                });
                
                cell.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });
        });