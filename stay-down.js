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
        player.velocity_y += gravity;
        player.velocity_y *= friction;
        player.y += player.velocity_y;

        collideTop(player, ground.top);
    }

    function collideTop(rectangle, top) {
        if (rectangle.getBottom() > top) {
            rectangle.setBottom(top);
        }
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

    function cycle() {
        window.requestAnimationFrame(cycle);
        update();
        render();
    }

    display.canvas.width = world_width;
    display.canvas.height = world_height;

    window.requestAnimationFrame(cycle);

}) ();