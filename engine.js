"use strict"
const engine = {

    // pointer
    update: undefined,
    render: undefined,

    running: false,
    raf_handle: undefined, //raf = requestAnimationFrame

    accumulate_time: 0,
    current_time: 0,
    delta: 1000 / 60, // 60FPS

    cycle(time_stamp) {

        // ** console.log(this);
        this.raf_handle = window.requestAnimationFrame(this.startCycle);

        this.elapse_time = time_stamp - this.current_time;
        this.accumulate_time += this.elapse_time;
        this.current_time = time_stamp;

        let updated = false;
        let x = 0;

        if (this.accumulate_time > 60)  this.accumulate_time = this.delta; // escape spiral of death        
        
        while (this.accumulate_time >= this.delta) {
            this.update();

            updated = true;
            
            this.accumulate_time -= this.delta;
        }

        
        if (updated) this.render();
    },

    start() {
        // o this no requestAnimationFrame, aponta para a window e não a função cycle **
        this.running = true;
        this.raf_handle = window.requestAnimationFrame(this.startCycle);
    },

    stop() {
        this.running = false;
        window.cancelAnimationFrame(this.raf_handle);
    },

    setup(update, render) {
        this.update = update;
        this.render = render;
    },
};

// anon func para fazer a ligação da engine em cycle, evitnado o problema **
// guambiarra para classe
(function() {

    // aqui, this.cycle(); o this vai estar ligado ao engine e não a window **
    this.startCycle = (time_stamp) => { this.cycle(time_stamp); };

}).call(engine);