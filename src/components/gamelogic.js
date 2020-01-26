
export default class GameLogic{
    _gamespeed = 200;

    STATE = {
        INITIAL: 0,
        PAUSED : 1,
        GAMEOVER : 2,
        PLAYING : 3
    };

    direction = {
        left: [0,-1],
        right: [0,1],
        up:[-1,0],
        down:[1,0],
        none: [0,0]
    }

    grid = [];
    snake =  {
        positions: [],
        direction: this.direction.right
    };
    token = [];
    _rows;
    _cols;
    score;
    
    onUpdate;

    


    constructor(_rows,_cols) {

        this._rows = _rows;
        this._cols = _cols;
        this.gameState = this.STATE.INITIAL;

        this.initialiseGame();
        this.startGame = this.startGame.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.updateGame = this.updateGame.bind(this);

        
        
        document.addEventListener("keydown", this.onKeyPressed, false);
        document.addEventListener("mousedown",this.startSwipe, false);
        document.addEventListener("mousemove",this.detectSwipe, false);

        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);

        document.addEventListener("swipeLeft",this.moveLeft);
        document.addEventListener("swipeRight",this.moveRight);
        document.addEventListener("swipeDown",this.moveDown);
        document.addEventListener("swipeUp",this.moveUp);
        document.addEventListener("tapGrid",this.startGame);

        var event = new CustomEvent('madeBlue');
      }

    
    initialiseGrid(){
        this.grid = [];
    
        for(var i = 0; i < this._rows; i++){
            var row = [];
            for(var j = 0; j < this._cols; j++){
                row.push(0);
            }
            this.grid.push(row);
        }
    }

    initialisesnake(){
        var randX = Math.floor(Math.random()*this._cols);
        var randY = Math.floor(Math.random()*this._rows);
        this.snake.positions = [[randX,randY]];
        this.snake.positions.push([randX,randY+1]);
    }

    updateGrid(){

        // add snake
        this.snake.positions.forEach((position)=>{
            this.grid[position[0]][position[1]] = 1;
        })

        // add token
        this.grid[this.token[0]][this.token[1]] = 2;

        if(this.onUpdate)
            this.onUpdate();

    }

    

    updateSnake(){
        var newsnakeHead = [0,0];
        newsnakeHead[0] = this.snake.positions[0][0];
        newsnakeHead[1] = this.snake.positions[0][1];

        newsnakeHead[0] += this.snake.direction[0];
        newsnakeHead[1] += this.snake.direction[1];

        newsnakeHead[0] = newsnakeHead[0] < 0? this._cols- 1:newsnakeHead[0];
        newsnakeHead[1] = newsnakeHead[1] < 0? this._rows - 1:newsnakeHead[1];

        newsnakeHead[0] = newsnakeHead[0] % this._cols;
        newsnakeHead[1] = newsnakeHead[1] % this._rows;

        var oldsnakeTail = this.snake.positions.pop(); //remove the tail
        this.grid[oldsnakeTail[0]][oldsnakeTail[1]] = 0;

        this.snake.positions.unshift(newsnakeHead); //add a head
    }

    updateGame(){
        //this.initialiseGrid();
        this.updateSnake();
        this.evaluateGrid();
        this.updateGrid();
    }

    placeToken(){

        let randY;
        let randX;

        do{
            randX = Math.floor(Math.random() * this._cols);
            randY = Math.floor(Math.random() * this._rows);
        }
        while(this.grid[randX][randY] == 1)
        
        this.token = [randX,randY];

    }

    evaluateGrid(){
        var snakeHead = this.snake.positions[0];

        if(snakeHead[0] == this.token[0] && snakeHead[1] == this.token[1]){
            this.score++;
            this.snake.positions.push(snakeHead);
            this.placeToken();
        }
        else if(this.grid[snakeHead[0]][snakeHead[1]] == 1){
            this.gameOver();
        }
    }

    initialiseGame(){
        this.score = 0;
        this.gameState = this.STATE.INITIAL;
        this.initialiseGrid();
        this.initialisesnake();
        this.placeToken();
        this.updateGrid();
    }

    toggleGame(){
    
        switch(this.gameState){
            case this.STATE.PLAYING:
                this.pauseGame();
                break;
            case this.STATE.INITIAL:
                this.startGame();
                break;
            case this.STATE.PAUSED:
                this.startGame();
                break;
            case this.STATE.GAMEOVER:
                this.initialiseGame();
                break;
        }
    }

    gameOver(){
        clearInterval(this.timer);
        this.gameState = this.STATE.GAMEOVER;
        this.onUpdate();
    }

    pauseGame(){
        clearInterval(this.timer);
        this.gameState = this.STATE.PAUSED;
        this.onUpdate();
    }

    startGame(){
        if(this.gameState != this.STATE.PLAYING){
            this.timer = setInterval(this.updateGame, this._gamespeed);
            this.gameState = this.STATE.PLAYING;
            this.onUpdate();
        }
    }

    
    

      onKeyPressed(e) {
    
        switch(e.keyCode){
            case 37: // left
                this.moveLeft();
                break;
            case 38: // up 
                this.moveUp();
                break;
            case 39: // right
                this.moveRight();
                break;
            case 40: // down
                this.moveDown();
                break;
            case 13: //enter
                this.toggleGame();
                break;
            default:
                break;
        }
      }

      moveLeft(){
        if(this.snake.direction != this.direction.right)
                    this.snake.direction = this.direction.left;
      }

      moveUp(){
        if(this.snake.direction != this.direction.down)
                    this.snake.direction = this.direction.up;
      }

      moveRight(){
        if(this.snake.direction != this.direction.left)
            this.snake.direction = this.direction.right;
      }

      moveDown(){
        if(this.snake.direction != this.direction.up)
            this.snake.direction = this.direction.down;
      }


   
}
