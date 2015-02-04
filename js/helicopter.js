//Code written by Milan Dukovski

$(document).ready(function () {
    var arrowUp = 38;
    var scoreTimeout;
    var helicopter;
    var counter;
    var playGame;
    var towerWidth;
    var timeOut;
    var score;
    var increment;
    var towerVx;
    var isEnd = false;
    var div = document.getElementById("helicopter");
    var width = div.offsetWidth;
    var height = div.offsetHeight;
    var middle = {};
    var bladesTop = {};
    var bladesRear = {};
    var bottomPart = {};
    var paper = Raphael(div, width, height);
    var towers;
    var options = {};
    options.middle_color = '#0093DD';
    options.base_color = 'rgb(65,103,153)';
    options.blades_color = 'rgb(156,161,166)';
    options.cloud_color = 'white';
    options.tower_color = 'brown';
    options.sky_color = 'rgb(135,206,235)';
    options.surface_color = '#01A611';
    options.sun_color = 'rgb(252, 212, 64)';
    // Game UI
    //TODO
    //var ui = $("#gameUI");
    //var uiIntro = $("#gameIntro");
    //var uiStats = $("#gameStats");
    var uiComplete = $("#gameComplete");
    var uiPlay = $("#playAgain");
    //var uiReset = document.getElementById("play");
    var uiScore = $("#gameScore");
    //var uiGameLives = $(".gameLives");

    var soundBackground = $("#gameSoundBackground").get(0);
    var soundThrust = $("#gameSoundThrust").get(0);
    var soundDeath = $("#gameSoundDeath").get(0);

    var Tower = function (width, Y1, H1, Y2, H2, widthT) {
        this.x = width - 60;
        this.y1 = Y1;
        this.h1 = H1;
        this.y2 = Y2;
        this.h2 = H2;
        this.w = widthT;
    };

    var Helicopter = function (height) {
        this.Height = height;
        this.x = 39;
        this.y = height - 622;
        this.center_x = 32;
        this.center_y = height - 572;
        this.middle_path = "M68.2583 71.562c-0.0219213,0.363213 -0.0279685,0.729071 -0.0196536,1.09682 0.207496,8.63547 8.97978,15.826 21.2372,18.6025 1.77033,0.324284 3.504,0.617575 5.19232,0.88063 2.39811,0.280819 4.88769,0.397606 7.44038,0.337134 18.4339,-0.444095 33.1521,-10.0396 32.8774,-21.4356 -0.055937,-2.21102 -0.665575,-4.32529 -1.75786,-6.29859 -4.4504,-8.04851 -16.8238,-13.6895 -31.358,-13.5345 -0.250961,0.00226772 -0.501922,0.00680315 -0.754772,0.0128504 -3.024,0.072189 -5.94785,0.392315 -8.7224,0.928252 -2.95862,0.567307 -5.74413,1.3765 -8.29985,2.39169 -9.19484,3.64573 -15.4057,9.93223 -15.8347,17.0188zm-54.6803 -1.07792l0.00302362 0 0 0.00302362 -0.00302362 0 0 -0.00302362z";
        this.bottom_path = "M22.1847 48.5212c0.104315,-1.44756 1.41128,-2.04662 2.94841,-2.04737 1.28164,-0.000755906 2.72391,0.414614 3.76403,1.10173 4.07773,2.69783 7.50917,7.65695 8.56857,12.4316l33.0913 -0.422173c0,0 0.80126,-1.25972 5.70369,-3.92882 3.62457,-2.21745 7.69059,-3.63893 11.8428,-4.47496 0.413481,-0.0827717 0.970961,-0.235087 1.60101,-0.402898l0.57789 -9.18463c0.0589607,-0.930898 1.15578,-1.61575 2.44536,-1.53789l1.20416 0.0797481c1.296,0.0808819 2.29342,0.89726 2.23635,1.8274 0,0 -0.860599,15.4636 -0.642142,17.2687 0.421418,3.47566 1.70797,6.88895 3.82451,9.69109 3.85474,5.09027 9.78029,7.1127 16.001,6.71963 5.94596,-0.373418 13.5224,-1.60063 17.1991,-6.86892l0.0105827 -0.0181417c0.250205,-0.387024 0.528378,-0.583559 0.807685,-0.64441 0.819402,-0.182173 1.67206,0.800882 1.97027,1.69058 0.681449,2.02923 0.948662,4.20473 0.721512,6.33903l0.000377953 0.00453544c-0.744189,7.00687 -6.27704,11.8583 -12.3923,14.7337l1.44869 6.74041c5.26262,-1.13575 11.3926,-3.96699 13.2813,-9.46016 0.68863,-2.02583 -0.619843,-6.37985 2.37657,-6.81563 2.36221,-0.339024 2.84447,1.95893 2.81273,3.99685 -0.0117165,0.75893 -0.0948662,1.4812 -0.178772,2.01827 -2.1566,13.801 -19.2287,15.8389 -30.3421,15.7897 -13.2155,-0.0661418 -26.7322,-0.969827 -39.7104,-3.55427 -2.79043,-0.557481 -15.2621,-2.61543 -13.5972,-7.44794 1.07414,-3.10148 3.67106,-0.715087 5.26148,0.109606 2.81386,1.44945 6.09714,2.10444 9.17934,2.72202l0.896126 -8.96202 0.416504 -0.543874c-4.55773,-3.54255 -6.62476,-6.90218 -6.62476,-6.90218l-28.8465 -6.96303 0.000377953 0.00491339c-1.66753,6.2298 -5.94218,9.23755 -9.38344,9.41292 -2.67666,0.136441 -4.84914,-1.44076 -4.89903,-4.54753 -0.00907087,-0.582425 0.055937,-1.21814 0.205984,-1.90602 1.67811,-7.70911 -0.589607,-17.0585 -3.44995,-24.3107 -0.266835,-0.679937 -0.36548,-1.25669 -0.331087,-1.73896zm58.4315 47.5484c6.89651,1.00913 13.855,1.62104 20.8158,2.01147 6.7457,0.374929 13.7042,0.794835 20.4389,0.0574488l-1.28693 -5.98829c-9.22054,3.30217 -19.5451,3.25606 -28.9746,0.876473l-0.0502677 -0.0124724c-1.65128,-0.487937 -3.34186,-1.00573 -5.06948,-1.55906l-0.0517796 -0.0222992c-2.65852,-0.979276 -5.48863,-2.32517 -8.15056,-4.01197l-0.851906 8.14904c1.0337,0.174236 2.09046,0.344315 3.18085,0.499654zm-6.33411 -24.2173c1.8943,7.58325 13.2306,10.9073 23.3216,7.30583 -4.5018,-1.88334 -9.80523,-13.1754 -8.30627,-20.0946 -7.05978,0.290268 -16.9164,5.20819 -15.0153,12.7888z";
        this.bladesTop_path = "M90.1554 40.1148c0.321638,-0.717733 0.530646,-1.09342 1.18413,-1.53336 -6.43578,-1.55301 -18.6319,-9.46545 -6.81298,-14.533 1.99862,-0.856819 3.67484,-1.20265 5.06986,-1.15994 7.21701,0.219591 6.9154,10.8268 4.86955,14.7696 1.22948,0.133795 2.32063,0.794079 3.00359,1.78016 4.44586,-2.66343 37.7193,-7.37537 38.2965,-1.1452 0.0064252,0.0668977 0.00831496,0.133039 0.0064252,0.198803 -0.158362,6.05632 -33.6204,7.3697 -38.4265,5.59181 -0.0612284,0.135307 19.8259,13.996 7.91509,19.0556 -1.42035,0.603969 -2.7069,0.885166 -3.86532,0.90293 -8.10974,0.126614 -9.9224,-12.6418 -7.15805,-17.989 -1.50879,0.0839056 -2.88983,-0.631559 -3.69903,-1.80019 -4.45115,2.65965 -35.523,7.19811 -36.0998,0.971717 -0.577512,-6.23131 30.8515,-6.91049 35.7166,-5.10992z";
        this.bladesRear_path = "M16.4561 77.8632c3.34224,5.28454 10.9776,-1.83534 13.7337,-6.2264 1.29562,0.695811 2.91817,0.691276 4.25046,-0.151181 1.33228,-0.843213 2.03263,-2.30665 1.95855,-3.77499 5.14432,-0.605859 14.8509,-4.45115 11.509,-9.73645 -0.836032,-1.32208 -1.94041,-1.86898 -3.16989,-1.87654 -3.68693,-0.0226772 -8.49752,4.80605 -10.5608,8.10067 -1.29487,-0.696945 -2.91817,-0.692032 -4.25008,0.150803 -1.33191,0.842079 -2.03263,2.30589 -1.95817,3.77462 -5.1515,0.605103 -14.8577,4.4504 -11.5128,9.73947z";
        this.original_width = 130;
        this.original_height = 80;
        this.isUp = false;
        this.Up = 10;
        this.Down = 6.5;
        this.moveUp = function () {
            if (this.y >= 15) {
                var transform = 'T 0,-' + this.Up;
                this.y -= this.Up;
                this.center_y -= this.Up;
                this.middle_path = Raphael.transformPath(this.middle_path, transform);
                this.bottom_path = Raphael.transformPath(this.bottom_path, transform);
                this.bladesTop_path = Raphael.transformPath(this.bladesTop_path, transform);
                this.bladesRear_path = Raphael.transformPath(this.bladesRear_path, transform);
            }
        };
        this.startPosition = function (tx, ty) {
            this.x += tx;
            this.y += ty;
            this.center_x += tx;
            this.center_y += ty;
            var transform = 'T ' + tx + ',' + ty;
            this.middle_path = Raphael.transformPath(this.middle_path, transform);
            this.bottom_path = Raphael.transformPath(this.bottom_path, transform);
            this.bladesTop_path = Raphael.transformPath(this.bladesTop_path, transform);
            this.bladesRear_path = Raphael.transformPath(this.bladesRear_path, transform);
        };
        this.moveDown = function () {
            if (this.y <= this.Height - this.original_height - 102) {
                var transform = 'T 0,' + this.Down;
                this.y += this.Down;
                this.center_y += this.Down;
                this.middle_path = Raphael.transformPath(this.middle_path, transform);
                this.bottom_path = Raphael.transformPath(this.bottom_path, transform);
                this.bladesTop_path = Raphael.transformPath(this.bladesTop_path, transform);
                this.bladesRear_path = Raphael.transformPath(this.bladesRear_path, transform);
            }
        };
        this.spinBlades = function (deg) {
            var transform = 'R' + deg + ', ' + this.center_x + ', ' + this.center_y;
            this.bladesRear_path = Raphael.transformPath(this.bladesRear_path, transform);
        };

        //this.print = function () {
        //    var tmp = 'x=' + this.x + ', y=' + this.y;
        //    console.log(tmp);
        //};
    };


    function drawBackground() {
        var surface = paper.rect(0, 546, 1024, 92);
        surface.attr({fill: options.surface_color, "stroke-width": 0});
        var sky = paper.rect(0, 0, 1024, 548);
        sky.attr({fill: options.sky_color, "stroke-width": 0});
        var sun = paper.circle(956, 78, 48);
        sun.attr({fill: options.sun_color, "stroke-width": 0});

        var cloud1 = paper.path("M53.1534 93.0977c-0.670489,-10.4205 21.8498,-16.8076 31.9344,-16.8076 31.9344,0 36.6361,11.4285 53.4437,28.2361 47.0514,15.4673 87.7399,-24.8746 117.994,-24.8746 70.5918,0 53.7842,102.526 -8.40378,102.526 -38.6574,0 -85.7364,3.34375 -109.249,-20.1691 -23.5128,-23.5128 -93.0399,-17.6599 -85.7186,-68.911z");
        var cloud2 = paper.path("M328.903 293.689c0.670489,-10.4205 -21.8498,-16.8076 -31.9344,-16.8076 -31.9344,0 -36.6361,11.4285 -53.4437,28.2361 -47.0514,15.4673 -87.7399,-24.8746 -117.994,-24.8746 -70.5918,0 -52.7505,113.816 8.40378,102.526l109.249 -20.1691c33.4069,-6.16744 93.0399,-17.6599 85.7186,-68.911z");
        var cloud3 = paper.path("M565.735 80.4065c53.898,-10.1972 92.0516,21.5157 151.266,36.9804 68.301,17.8379 49.3353,79.4276 -8.40378,102.526 -36.4161,14.5682 -92.0123,-18.8451 -115.525,-42.3576 -25.6759,-25.6759 -153.217,-73.3335 -27.3373,-97.149z");
        var cloud4 = paper.path("M570.775 384.791c-0.670489,10.4205 21.8498,16.8076 31.9344,16.8076 29.0544,0 57.9455,-10.5494 86.1831,-11.3896 28.238,-0.840189 55.8236,8.0281 85.2541,8.0281 70.5918,0 53.7842,-102.526 -8.40378,-102.526 -41.5646,0 -204.115,25.0447 -194.968,89.0801z");
        cloud1.attr({fill: options.cloud_color, "stroke-width": 0});
        cloud2.attr({fill: options.cloud_color, "stroke-width": 0});
        cloud3.attr({fill: options.cloud_color, "stroke-width": 0});
        cloud4.attr({fill: options.cloud_color, "stroke-width": 0});

        paper.text(956, 80, "Score: " + score).attr({
            fill: 'black',
            "font-size": 16,
            "font-family": "Arial, Helvetica, sans-serif"
        });
    }


    function startGame() {
        //uiScore.html("0");
        //uiStats.show();
        towers = new Array();
        score = 0;
        increment = 2;
        counter = 0;
        timeOut = 40;
        towerVx = 5;
        playGame = false;
        towerWidth = 40;
        //isUp=false;
        isEnd = false;
        helicopter = new Helicopter(height);
        helicopter.startPosition(250, 150);

        var h1 = 150 + (Math.random() * 300);
        var y1 = height - h1;
        var h2 = height - (h1 + 160);
        var y2 = 0;
        h1 -= 92;
        var t1 = new Tower(width, y1, h1, y2, h2, towerWidth);
        towers.push(t1);

        $(window).keydown(function (e) {
            var keyCode = e.keyCode;
            if (playGame == false) {
                playGame = true;
                // Start the animation loop
                soundBackground.currentTime = 0;
                soundBackground.play();

                animate();

                // Start game timer
                timer();
            }

            if (keyCode == arrowUp) {
                helicopter.isUp = true;

                soundThrust.currentTime=0;
                soundThrust.play();
            }
        });

        $(window).keyup(function (e) {
            var keyCode = e.keyCode;

            if (keyCode == arrowUp) {
                //helicopter.play(false);
                helicopter.isUp = false;
                soundThrust.pause();
            }

        });
        // Start the animation loop
        animate();
    }

    function init() {
        uiComplete.hide();
        startGame();
    }

    uiPlay.click(function(){
        uiComplete.hide();
        startGame();
    })

    function Hit(x, y, w, h) {
        if (helicopter.x < x + w - 30 && helicopter.x + helicopter.original_width - 30 > x &&
            helicopter.y < y + h - 5 && helicopter.y + helicopter.original_height - 5 > y) {
            console.log("udar");
            alert("udar")
        }
    }

    function isCollisionDetected(h, t) {
        //Bottom Part
        if (h.x < t.x + t.w - 23 && h.x + h.original_width - 23 > t.x &&
            h.y < t.y1 + t.h1 + 7 && h.y + h.original_height + 7 > t.y1) {
            isEnd = true;
        }//Top Part
        else if (h.x < t.x + t.w - 30 && h.x + h.original_width - 30 > t.x &&
            h.y < t.y2 + t.h2 - 5 && h.y + h.original_height - 5 > t.y2) {
            isEnd = true;
        }

        if (isEnd) {
            //Stop thrust sound
            soundThrust.pause();

            // Play death sound
            soundDeath.currentTime = 0;
            soundDeath.play();
            playGame = false;


            clearTimeout(scoreTimeout);
            uiScore.html(score);
            uiComplete.show();

            //// Reset sounds
            soundBackground.pause();

            // Reset event handlers
            $(window).unbind("keyup");
            $(window).unbind("keydown");
        }

    }

    function timer() {
        if (playGame) {
            scoreTimeout = setTimeout(function () {
                score++;
                timer();
            }, 30);
        }
    }

    function animate() {
        paper.clear();
        drawBackground();

        if (helicopter.isUp) {
            helicopter.moveUp();
            helicopter.spinBlades(60);
        }
        else {
            helicopter.moveDown();
            helicopter.spinBlades(24);
        }


        middle = paper.path(helicopter.middle_path);
        middle.attr({fill: options.middle_color, "stroke-width": 0});
        bottomPart = paper.path(helicopter.bottom_path);
        bottomPart.attr({fill: options.base_color, "stroke-width": 0});
        bladesTop = paper.path(helicopter.bladesTop_path);
        bladesTop.attr({fill: options.blades_color, "stroke-width": 0});
        bladesRear = paper.path(helicopter.bladesRear_path);
        bladesRear.attr({fill: options.blades_color, "stroke-width": 0});

        var towerLength = towers.length;
        var i = 0;
        while (i < towerLength) {
            var t = towers[i];

            if (t.x <= 0) {
                towers.splice(i, 1);
                towerLength--;
                continue;
            }

            t.x -= towerVx;
            isCollisionDetected(helicopter, t);

            var square1 = paper.rect(t.x, t.y1, t.w, t.h1);
            var square2 = paper.rect(t.x, t.y2, t.w, t.h2);
            square1.attr({
                fill: 'brown'
            });
            square2.attr({
                fill: 'brown'
            });
            i++;
        }

        counter += 2;
        if (counter % 300 == 0)
            towerWidth += 2;
        //if (counter % 1000 == 0 && increment <= 8)
        //    increment += 2;
        if (counter % 500 == 0 && towerVx <= 10) {
            towerVx += 1;
            helicopter.Up += 1;
            helicopter.Down += 1;
        }
        if (counter % 100 == 0) {
            var h1 = 150 + (Math.random() * 300);
            var y1 = height - h1;
            var h2 = height - (h1 + 160);
            var y2 = 0;
            h1 -= 92;
            var t1 = new Tower(width, y1, h1, y2, h2, towerWidth);
            towers.push(t1);
        }


        if (playGame) {
            // Run the animation loop again in 33 milliseconds
            setTimeout(animate, 30);
        }

    }

    init();

});
