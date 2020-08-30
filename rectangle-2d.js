const Rectangle2D = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

Rectangle2D.prototype = {
    getBottom() { return this.y + this.height; },
    setBottom(y) { this.y = y - this.height; },
};