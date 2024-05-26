class Obstacle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.index = Obstacle.list.length;
        Obstacle.list.push(this);
    }
    
    // get the borders of the obstacle
    get borders() {
        return {
            left:  this.x,
            right: this.x+1,
            up:    this.y,
            down:  this.y+1,
        };
    }
    
    // get the distance between the player and the obstacle in all four directions
    get dist() {
        const borders = this.borders;
        return {
            left:  borders.left-(posX+1),
            right: (posX)-borders.right,
            up:    borders.up-(posY+1),
            down:  (posY)-borders.down,
        };
    }
    
    // draw the obstacle
    draw() {
        // will be embellished later
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, 1, 1);
    }
    
    // calculate collisions of the player with the obstacle
    checkCollisions() {
        const dist = this.dist;
        let maxDist = Math.max(...Object.values(dist));
        
        // return if the player character is not touching the obstacle
        if (maxDist > 0) return;
        
        // see which side of the obstacle the player collided with
        switch (maxDist) {
            case dist.up: {
                posY += dist.up;
                velY = 0;
                break;
            }
            case dist.down: {
                posY -= dist.down;
                velY = 0;
                break;
            }
            case dist.left: {
                posX += dist.left;
                velX = 0;
                break;
            }
            case dist.right: {
                posX -= dist.right;
                velX = 0;
                break;
            }
        }
    }
    
    static list = []; // list containing all the obstacles
    static draw() { // draw all obstacles
        for (let i = 0; i < this.list.length; i++) this.list[i].draw();
    }
    static checkCollisions() { // calculate collisions of the player with obstacles
        for (let i = 0; i < this.list.length; i++) this.list[i].checkCollisions();
    }
}