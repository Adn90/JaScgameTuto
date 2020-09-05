// variáveis declaradas aqui vão ser verificadas primeiro que o escopo geral
// evita var globais?
// variáveis desse escopo
// variáveis desse globais

"use strict";
(() => {

    const world_width = 480;
    const world_height = 480;

    const gravity = 1;
    const friction = 0.9;

    let display = document.getElementById('canvas').getContext('2d', { alpha: false });
    let document_element = document.documentElement;

    let player = new Player(100, 100);

    let ground = {
        top: world_height - 32, // altura do mundo - altura do player
    }

    function update () {

        if (controller.left) player.moveLeft();
        if (controller.right) player.moveRight();
        if (controller.up) player.jump();

        

        player.updatePosiiton(gravity, friction)

        if (collideTop(player, ground.top)) {
            
            player.ground();
        }
    }

    function collideTop(rectangle, top) {
        if (rectangle.getBottom() > top) {
            rectangle.setBottom(top);

            return true; // o obejto que herda rectangle, está 'grounded'
        }
        return false;
    }

    function render() {
        display.fillStyle = '#303840';
        display.fillRect(0, 0, world_width, world_height);

        display.strokeStyle = '#202830';
        display.beginPath();
        display.moveTo(0, ground.top);
        display.lineTo(world_width, ground.top);
        display.lineWidth = 4;
        display.stroke();

        display.fillStyle = player.color;
        display.fillRect(player.x, player.y, player.width, player.height);
    }


    display.canvas.width = world_width;
    display.canvas.height = world_height;

    function keyDownUp(event) {
        // evita comportamento padrão, como usar setas para scroll
        event.preventDefault();

        let state = event.type == 'keydown'; // estado da tecla

        // console.log(event.type); verifica qual é o evento de apertar um botão e soltar
        // console.log(event.keyCode); //jeito simples de descobrir o cód ascII das teclas 
        switch(event.keyCode) {

            case 37: controller.left = state; break;
            case 38: controller.up = state; break;
            case 39: controller.right = state; break;
            case 27: controller.esc = state; break;
            case 13: controller.start = state; // tip: não percisa de break, já que é o último item
        }

        if (controller.start || controller.esc) {
            

            if (engine.running) engine.stop();
            else                engine.start();
        }
    }

    window.addEventListener('keydown', keyDownUp);
    window.addEventListener('keyup', keyDownUp);
    
    engine.setup(update, render)
    engine.start();

}) ();