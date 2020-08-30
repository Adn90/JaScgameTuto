const Player = function (x, y, width, height) {

    this.color = '#ff0000';

    this.grounded = false; // verifica se está no chão

    this.move_speed = 1;
    this.jump_force = 18;

    this.velocity_x = 0;
    this.velocity_y = 0;

    // ''construtor'' o this é do player e os outros parâmetros do objeto Rectangle2D
    // gambiarra de OO em JS
    Rectangle2D.call(this, x, y, 32, 32);

};

Player.prototype = {
    moveLeft() { this.velocity_x -= this.move_speed; },

    moveRight() { this.velocity_x += this.move_speed; },

    updatePosiiton(gravity, friction) {

        this.velocity_x *= friction;
        this.velocity_y += gravity;
        this.velocity_y *= friction;

        this.x += this.velocity_x;
        this.y += this.velocity_y;
    },

    jump() {
        if (this.grounded) {
            this.velocity_y -= this.jump_force
            this.grounded = false;
        }
    },

    ground() {
        this.grounded = true;
        // sem setar velocity_y = 0, os pulos ficam inconsistentes (ver em console.log)
        //console.log(this.velocity_y);
        this.velocity_y = 0;
    }
};

// passando as propriedades de Rectangle2D e passando para o Player
// Gambiarra para Herança
Object.assign(Player.prototype, Rectangle2D.prototype);