export const levels = [
    function() {
        // position the player
        player = {
            posX: 1,
            posY: 2.1,
            velX: 0,
            velY: 0,
            width: 0.9,
            height: 1.9,
            climb: false,
        };
        
        // position the target
        target = {
            posX: 9.1,
            posY: 11.1,
            width: 0.8,
            height: 0.8,
        };
        
        // add some obstacles
        new Obstacle( 4,  1,  1,  2);
        new Obstacle( 1,  4,  2,  1);
        new Obstacle( 2,  5,  3,  1);
        new Obstacle( 4,  6,  4,  1);
        new Obstacle( 7,  5,  1,  2);
        new Obstacle( 8,  4,  1,  2);
        new Obstacle( 2,  9,  8,  1);
        new Obstacle( 0,  0,  1, 13); // left margin
        new Obstacle(10,  0,  1, 13); // right margin
        new Obstacle( 1,  0,  9,  1); // top margin
        new Obstacle( 1, 12,  9,  1); // bottom margin
    },
    function() {
        // position the player
        player = {
            posX: 5,
            posY: 1.1,
            velX: 0,
            velY: 0,
            width: 0.9,
            height: 1.9,
            climb: false,
        };
        
        // position the target
        target = {
            posX: 7.1,
            posY: 2.1,
            width: 0.8,
            height: 0.8,
        };
        
        // add some obstacles
        new Obstacle( 6,  0,  1,  2);
        new Obstacle( 3,  3,  7,  1);
        new Obstacle( 0,  5,  1,  3);
        new Obstacle(12,  5,  1,  3);
        new Obstacle( 1,  7,  4,  1);
        new Obstacle( 8,  7,  4,  1);
    },
    function() {
        // position the player
        player = {
            posX: 13,
            posY: 0.1,
            velX: 0,
            velY: 0,
            width: 0.9,
            height: 1.9,
            climb: false,
        };
        
        // position the target
        target = {
            posX: 9.1,
            posY: 2.1,
            width: 0.8,
            height: 0.8,
        };
        
        // add some obstacles
        new Obstacle( 0,  0,  6,  1);
        new Obstacle( 0,  6,  1,  4);
        new Obstacle( 1,  9,  8,  1);
        new Obstacle( 8,  7,  1,  2);
        new Obstacle( 6,  7,  2,  1);
        new Obstacle( 1,  3,  9,  1);
        new Obstacle( 3,  4,  1,  3);
        new Obstacle( 8,  0,  1,  3);
        new Obstacle( 9,  0,  4,  1);
        new Obstacle(13,  2,  1,  8);
        new Obstacle(12,  5,  1,  1);
        new Obstacle(11,  7,  1,  3);
        new Obstacle(12,  9,  1,  1);
    },
    function() {
        // position the player
        player = {
            posX: 11,
            posY: 11.1,
            velX: 0,
            velY: 0,
            width: 0.9,
            height: 1.9,
            climb: false,
        };
        
        // position the target
        target = {
            posX: 1.1,
            posY: 4.1,
            width: 0.8,
            height: 0.8,
        };
        
        // add some obstacles
        new Obstacle( 1,  0,  1,  3);
        new Obstacle( 4,  2,  1,  2);
        new Obstacle( 2,  4,  1,  1);
        new Obstacle( 0,  5,  7,  1);
        new Obstacle( 6,  4,  1,  1);
        new Obstacle( 7,  3,  1,  2);
        new Obstacle( 4,  9,  8,  1);
        new Obstacle( 0, 11,  1,  2);
        new Obstacle(10,  7,  1,  2);
        new Obstacle(11,  5,  1,  4);
        new Obstacle( 0, 13, 12,  1);
    },
    function() {
        // position the player
        player = {
            posX: 0,
            posY: 11.1,
            velX: 0,
            velY: 0,
            width: 0.9,
            height: 1.9,
            climb: false,
        };
        
        // position the target
        target = {
            posX: 1.1,
            posY: 0.1,
            width: 0.8,
            height: 0.8,
        };
        
        // add some obstacles
        new Obstacle( 0, 13,  1,  1);
        new Obstacle( 4, 11,  1,  1);
        new Obstacle( 9, 12,  1,  1);
        new Obstacle(12, 10,  1,  1);
        new Obstacle(17,  9,  1,  1);
        new Obstacle(20, 11,  1,  1);
        new Obstacle(22,  9,  1,  1);
        new Obstacle(23,  7,  1,  1);
        new Obstacle(24,  5,  1,  1);
        new Obstacle(21,  3,  1,  1);
        new Obstacle(17,  3,  1,  1);
        new Obstacle(13,  3,  1,  1);
        new Obstacle( 9,  4,  1,  1);
        new Obstacle( 6,  4,  1,  1);
        new Obstacle( 3,  3,  1,  1);
        new Obstacle( 1,  1,  1,  1);
        new Obstacle( 0,  0,  1,  1);
    },
    function() {
        // position the player
        player = {
            posX: 4,
            posY: 5.1,
            velX: 0,
            velY: 0,
            width: 0.9,
            height: 1.9,
            climb: false,
        };
        
        // position the target
        target = {
            posX: 24.1,
            posY: 0.1,
            width: 0.8,
            height: 0.8,
        };
        
        // add some obstacles
        new Obstacle( 1,  7,  6,  1);
        new Obstacle( 3,  4,  1,  2);
        new Obstacle( 5,  2,  1,  2);
        new Obstacle( 8,  5,  1,  2);
        new Obstacle(10,  3,  1,  2);
        new Obstacle(12,  0,  1,  2);
        new Obstacle( 0, 13,  1,  1);
        new Obstacle( 1, 13,  1,  1);
        new Obstacle( 3, 13,  1,  1);
        new Obstacle( 6, 13,  1,  1);
        new Obstacle(10, 13,  1,  1);
        new Obstacle(15, 13,  1,  1);
        new Obstacle(21, 13,  1,  1);
        new Obstacle(23, 12,  1,  1);
        new Obstacle(24, 10,  1,  1);
        new Obstacle(20,  8,  1,  1);
        new Obstacle(18,  7,  1,  1);
        new Obstacle(17,  5,  1,  1);
        new Obstacle(21,  4,  1,  1);
        new Obstacle(23,  3,  1,  1);
        new Obstacle(24,  1,  1,  1);
        new Obstacle(25,  0,  1,  1);
    },
    function() {
        // position the player
        player = {
            posX: 0,
            posY: 11.1,
            velX: 0,
            velY: 0,
            width: 0.9,
            height: 1.9,
            climb: false,
        };
        
        // position the target
        target = {
            posX: 7.1,
            posY: 2.1,
            width: 0.8,
            height: 0.8,
        };
        
        // add some obstacles
        new Obstacle( 0, 13, 1, 1);
        new Obstacle( 4, 13, 1, 1);
        new Obstacle( 8, 13, 1, 1);
        new Obstacle(12, 13, 1, 1);
        new Obstacle(16, 13, 1, 1);
        new Obstacle(17, 11, 1, 1);
        new Obstacle(18,  9, 1, 1);
        new Obstacle(15,  8, 1, 1);
        new Obstacle(14,  6, 1, 1);
        new Obstacle(13,  4, 1, 1);
        new Obstacle(18,  5, 1, 1);
        new Obstacle(13,  3, 1, 1);
        new Obstacle(12,  3, 1, 1);
        new Obstacle( 9,  5, 1, 1);
        new Obstacle( 8,  8, 4, 1);
        new Obstacle( 6,  8, 1, 1);
        new Obstacle( 2,  8, 1, 1);
        new Obstacle( 1,  6, 1, 1);
        new Obstacle( 0,  4, 1, 1);
        new Obstacle( 3,  3, 1, 1);
        new Obstacle( 5,  2, 1, 1);
        new Obstacle( 5,  3, 4, 1);
        new Obstacle( 8,  0, 1, 3);
    },
];
