basicPSO = function(paper, mathopt) {
    var i;
    var objectives = [{
        name: 'Rastrigin function',
        cameraTopLeft: [-10, -10],
        cameraSize: [20, 20],
        particles: 7,
        globalAcceleration: 1.9,
        localAcceleration: 2,
        f: function(x, y) {
            if(x < -5.12 || x > 5.12 || y < -5.12 || y > 5.12) {
                return Number.POSITIVE_INFINITY;
            }
            return 20 + (x * x - 10 * Math.cos(2 * Math.PI * x)) + (y * y - 10 * Math.cos(2 * Math.PI * y));
        },
        initialPosition: [5, 5],
        minima: [
            [0, 0]
        ]
    }, {
        name: 'Cornfield',
        cameraTopLeft: [-200, -200],
        cameraSize: [400, 400],
        particles: 7,
        globalAcceleration: 2,
        localAcceleration: 2,
        f: function(x, y) {
            return Math.abs(x - 100) + Math.abs(y - 100);
        },
        initialPosition: [0, 0],
        minima: [
            [100, 100]
        ]
    }, {
        name: 'Hölder table function',
        cameraTopLeft: [-20, -20],
        cameraSize: [40, 40],
        particles: 7,
        globalAcceleration: 2,
        localAcceleration: 2,
        f: function(x, y) {
            if(x > 10 || x < -10 || y > 10 || y < -10) {
                return Number.POSITIVE_INFINITY;
            }
            return -Math.abs(Math.sin(x) * Math.cos(y) * Math.exp(Math.abs(1 - Math.sqrt(x * x + y * y)/Math.PI)));
        },
        initialPosition: [0, 0],
        minima: [
            [8.05502, 9.66459],
            [-8.05502, 9.66459],
            [8.05502, -9.66459],
            [-8.05502, -9.66459]
        ]
    }];
    var palette = [
        'green',
        'red',
        'blue',
        'black',
        'cyan',
        'yellow',
        'pink',
        'orange',
        'gray',
        'lime',
        'brown'
    ];

    document.body.style.margin = '10px';

    var iterationsEl = document.createElement('input');
    iterationsEl.style.position = 'absolute';
    iterationsEl.style.background = 'transparent';
    iterationsEl.style.borderWidth = '0';
    iterationsEl.style.width = '200px';
    iterationsEl.style.top = '20px';
    iterationsEl.style.left = (window.innerWidth - 50 + 10 - 200) + 'px';
    document.body.appendChild(iterationsEl);

    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 50;
    canvas.style.border = '1px solid black';
    document.body.appendChild(canvas);
    paper.setup(canvas);

    var select = document.createElement('select');
    select.style.position = 'absolute';
    select.style.top = '20px';
    select.style.left = '20px';
    for(i = objectives.length; i--; ) {
        var option = document.createElement('option');
        option.setAttribute('value', i);
        if(i === 0) {
            option.setAttribute('selected', true);
        }
        option.appendChild(document.createTextNode(objectives[i].name));
        select.appendChild(option);
    }
    select.addEventListener('change', function() {
        start();
    }, false);
    document.body.appendChild(select);

    var bound = function(x, min, max) {
        return Math.max(Math.min(x, max), min);
    };
    var frameTimeout;
    var items = [];
    var onFrame;
    paper.view.onFrame = function() {
        onFrame();
    };
    var start = function() {
        for(var i = items.length; i--;) {
            items[i].remove();
        }
        clearTimeout(frameTimeout);
        var objective = objectives[parseInt(select.value)];
        var setPoint = function(point, position) {
            point.x = (bound(position[0] - objective.cameraTopLeft[0], 0, objective.cameraSize[0]) /
                    objective.cameraSize[0]) * paper.view.viewSize.width;
            point.y = (bound(position[1] - objective.cameraTopLeft[1], 0, objective.cameraSize[1]) /
                    objective.cameraSize[1]) * paper.view.viewSize.height;
        };

        var options = {
            initialPosition: objective.initialPosition,
            globalAcceleration: objective.globalAcceleration,
            localAcceleration: objective.localAcceleration,
            particles: objective.particles,
            oniteration: function(iteration, p, v, pbest, best, nextFrame) {
                iterationsEl.value = 'Iteration: ' + iteration;
                state.p = p;
                state.minimum[0] = pbest[best][0];
                state.minimum[1] = pbest[best][1];
                paper.view.draw();
                frameTimeout = setTimeout(nextFrame, 100);
            },
            onstop: function(result) {
                console.log('Optimization of ' + objective.name + ' has finished after ' + result.iterations + ' iterations.');
            }
        };
        var particles = new Array(options.particles);
        var state = {
            minimum: [0, 0],
            p: new Array(options.particles)
        };
        for(i = objective.minima.length; i--;) {
            var minimum = new paper.Path.Circle(new paper.Point(0, 0), 5);
            items.push(minimum);
            minimum.fillColor = 'black';
            setPoint(minimum.position, objective.minima[i]);
        }
        var foundMinimum = new paper.Path.Circle(new paper.Point(0, 0), 5);
        items.push(foundMinimum);
        foundMinimum.strokeColor = 'black';
        onFrame = function() {
            setPoint(foundMinimum.position, state.minimum);
            for(var i = options.particles; i--;) {
                setPoint(particles[i].position, state.p[i]);
            }
        };

        for(i = options.particles; i--;) {
            particles[i] = new paper.Path.Circle(new paper.Point(0, 0), 3);
            items.push(particles[i]);
            particles[i].fillColor = palette[i];
            state.p[i] = [0, 0];
        }
        mathopt.basicPSO(objective.f, options);
    };
    start();
};
