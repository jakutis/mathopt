# mathopt

A JavaScript library of mathematical optimization methods.

## Installation

  Install with [npm](http://npmjs.org):

    $ npm install mathopt

  Install with [component](http://component.io):

    $ component install jakutis/mathopt

  Install with [bower](http://bower.io):

    $ bower install mathopt

## API

See [a demonstration of examples](https://jakut.is/mathopt/examples/) (source code in "examples" subfolder).

### .basicPSO

Basic Particle Swarm Optimization method finds the global minimum of a given numerical function using particle swarm paradigm.

Implements the algorithm that is described in an article ["Particle swarm optimization" by James Kennedy and Russel Eberhart that is published in proceedings of IEEE International Conference on Neural Networks, 1995](http://ieeexplore.ieee.org/xpls/abs_all.jsp?arnumber=488968).

```javascript
var mathopt = require('mathopt');

var cornfield = function(x, y) {
    return Math.abs(x - 100) + Math.abs(y - 100);
};

// basic usage
// prints "Minimum found at TODO"
console.log('Minimum found at ', mathopt.basicPSO(cornfield));

// demonstration of all the options
mathopt.basicPSO(function(x) {
    return cornfield(x[0], x[1]);
}, {
    // default: 21
    particles: 50,

    // default: inferred from the given function; when specified - the given function must accept a vector
    dimensions: 2,

    // default: [0, 0]
    initialPosition: [5, 5],

    // default: 0.01
    idleSpeed: 0.1,

    // default: 0.7298
    inertia: 0.7,

    // default: 2.9922/2
    localAcceleration: 1.5,

    // default: 2.9922/2
    globalAcceleration: 1.5,

    // default: `function(i, p, v, pbest, best, cb) { cb && setTimeout(cb, 0); }`
    // when onstop is null, cb argument is not passed
    oniteration: function(iteration, positions, velocities, bestpositions, bestparticle, cb) {
        console.log(iteration, bestpositions);
        cb && setTimeout(cb, 0);
    },

    // default: null
    // when set, switches to asynchronous behavior:
    // - .basicPSO does not return anything
    // - oniteration receives a `cb` callback
    onstop: function(min) {
        // prints "Minimum found at x=TODO, y=TODO, after TODO iterations"
        console.log('Minimum found at x=' + min[0] + ', y=' + min[1] + ' after ' + min.iterations + ' iterations');
    }
});
```

## License

MIT
