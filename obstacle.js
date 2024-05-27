export class Obstacle {
    constructor(x, y, width = 1, height = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
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
    
    // get the distance between a character and the obstacle in all four directions
    dist(character) {
        const borders = this.borders;
        return {
            left:  borders.left-(character.posX+character.width),
            right: (character.posX)-borders.right,
            up:    borders.up-(character.posY+character.height),
            down:  (character.posY)-borders.down,
        };
    }
    
    // draw the obstacle
    draw(ctx) {
        // will be embellished later
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, 1, 1);
    }
    
    // calculate collisions of a character with the obstacle
    checkCollisions(character) {
        const dist = this.dist(character);
        let maxDist = Math.max(...Object.values(dist));
        
        // return if the character is not touching the obstacle
        if (maxDist > 0) return;
        
        // see which side of the obstacle the character collided with
        switch (maxDist) {
            case dist.up: {
                character.posY += dist.up;
                character.velY = 0;
                character.touching.up = true;
                break;
            }
            case dist.down: {
                character.posY -= dist.down;
                character.velY = 0;
                character.touching.down = true;
                break;
            }
            case dist.left: {
                character.posX += dist.left;
                character.velX = 0;
                character.touching.left = true;
                break;
            }
            case dist.right: {
                character.posX -= dist.right;
                character.velX = 0;
                character.touching.right = true;
                break;
            }
        }
    }
    
    static list = []; // list containing all the obstacles
    static draw(ctx) { // draw all obstacles
        for (let i = 0; i < this.list.length; i++) this.list[i].draw(ctx);
    }
    static checkCollisions(character) { // calculate collisions of a character with obstacles
        for (let i = 0; i < this.list.length; i++) this.list[i].checkCollisions(character);
    }
}