# mathopt

A JavaScript library of mathematical optimization methods.

- [Overview](#overview)
- [Installation](#installation)
- [API](#api)
- [Development](#development)

## Overview

* Works on browsers and NodeJS.
* Tested on these browsers:
  * TODO

## Installation

  Install manually by adding to your HTML file:

    <script src="/path/to/mathopt/index.js"></script>

  Install with [npm](https://www.npmjs.org/package/mathopt):

    $ npm install --save mathopt

  Install with [component](http://component.io/jakutis/mathopt):

    $ component install jakutis/mathopt

  Install with [bower](http://bower.io):

    $ bower install --save mathopt

## API

See [a demonstration of examples](https://jakut.is/mathopt/examples/) (source code in "examples" subfolder).

### .basicPSO

Basic Particle Swarm Optimization method finds the global minimum of a given numerical function using particle swarm paradigm.

Implements the algorithm that is described in an article ["Particle swarm optimization" by James Kennedy and Russel Eberhart that is published in proceedings of IEEE International Conference on Neural Networks, 1995](http://dx.doi.org/10.1109/ICNN.1995.488968).

The default parameters are taken from an article ["The Particle Swarm - Explosion, Stability, and Convergence in a Multidimensional Complex Space" by Maurice Clerck and James Kennedy that is published in IEEE Transactions on Evolutionary Computation (2002, issue #1 of volume #6)](http://dx.doi.org/10.1109/4235.985692).

All particles are initialized with the position specified in `initialPosition` option.
Initial velocities are sampled from `U(0, 2)`.

```javascript
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

## Development

    TODO

