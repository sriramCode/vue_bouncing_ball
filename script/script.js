Vue.component('playground', {
    template: '<div id="ground"><div id = "playerA" class = "paddle bottom" > </div> </div > '
})

var mixin = {
    methods: {
        randomXToY: function (minVal, maxVal, floatVal) {
            randVal = minVal + (Math.random() * (maxVal - minVal));
            return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
        },
        loop: function () {
            for (i = 0; i < this.balls.length; i++) {
                this.balls[i].move();
            }

            setTimeout(app.loop, 20);
        }
    }

}
var app = new Vue({
    el: '#app',
    mixins: [mixin],

    data: {
        ball: '',
        i: '',
        x: '',
        y: '',
        balls: [],
        radius: '',
        boundaryHeight: '',
        boundaryWidth: '',
        ground: {
            width: 500,
            height: 500
        },
        playerA: {
            x: 0,
            left: 10,
            height: 10,
            width: 80
        }
    },
    methods: {
        add: function () {
            // The Ball class
            Ball = (function () {

                // constructor
                function Ball(x, y, radius, color) {
                    this.center = {
                        x: x,
                        y: y
                    };
                    this.radius = radius;
                    this.color = color;
                    this.dx = 2;
                    this.dy = 2;
                    this.boundaryHeight = 500;
                    this.boundaryWidth = 500;

                    this.dom = $('<p class="circle"></p>').appendTo('#ground');

                    // the rectange div a circle
                    this.dom.width(radius * 2);
                    this.dom.height(radius * 2);
                    this.dom.css({
                        'border-radius': radius,
                        background: color
                    });

                    this.placeAtCenter(x, y);
                }

                // Place the ball at center x, y
                Ball.prototype.placeAtCenter = function (x, y) {
                    this.dom.css({
                        top: Math.round(y - this.radius),
                        left: Math.round(x - this.radius)
                    });
                    this.center.x = Math.round(x);
                    this.center.y = Math.round(y);
                };
                // move and bounce the ball
                Ball.prototype.move = function () {
                    var radius = this.radius;
                    if (this.center.x - radius < 0 || this.center.x + radius > this.boundaryWidth) {
                        this.dx = -this.dx;
                    }
                    if (this.center.y - radius < 0) {
                        this.dy = -this.dy;
                    }
                    //my if
                    if (((this.center.y + this.radius >= this.boundaryHeight - 10) && (this.center.y <= this.boundaryHeight - 8)) && ((this.center.x + this.radius) >= ($("#playerA").offset().left - 20) && (this.center.x + this.radius) <= ($("#playerA").offset().left + 90))) {
                        this.dy = -this.dy;
                    }
                    this.placeAtCenter(this.center.x + this.dx, this.center.y + this.dy);
                };



                return Ball;
            })();
            for (i = 0; i < this.ball; i++) {
                boundaryHeight = 500;
                boundaryWidth = 500;
                y = app.randomXToY(30, boundaryHeight - 50);
                x = app.randomXToY(30, boundaryWidth - 50);
                radius = app.randomXToY(15, 30);
                this.balls.push(new Ball(x, y, radius, '#' + Math.floor(Math.random() * 16777215).toString(16)));

            }
            app.loop();
        }
    },
    mounted: function () {
        $("#ground").mousemove(function (e) {
            app.playerA.x = parseInt(e.pageX - app.playerA.left - 80);
            $("#playerA").css("left", app.playerA.x);
        });
    }
})