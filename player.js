const Player = function(x, y, width, height) {
    
    this.color = '#ff0000';

    this.velocity_x = 0;
    this.velocity_y = 0;
        
    // ''construtor'' o this é do player e os outros parâmetros do objeto Rectangle2D
    // gambiarra de OO em JS
    Rectangle2D.call(this, x, y, 32, 32);

};

Player.prototype = {
    
};

// passando as propriedades de Rectangle2D e passando para o Player
// Gambiarra para Herança
Object.assign(Player.prototype, Rectangle2D.prototype);