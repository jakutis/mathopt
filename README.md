# mathopt

A JavaScript library of mathematical optimization methods

## Installation

  Install with [npm](http://npmjs.org):

    $ npm install mathopt

  Install with [component](http://component.io):

    $ component install jakutis/mathopt

  Install with [bower](http://bower.io):

    $ bower install mathopt

## API

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
var min = mathopt.basicPSO(function(x) {
    return cornfield(x[0], x[1]);
}, {
    particles: 50, // by default it is 21
    dimensions: 2 // by default it is inferred from the given function; when specified - the given function must accept a vector
});
// prints "Minimum found at x=TODO, y=TODO, after TODO iterations"
console.log('Minimum found at x=' + min[0] + ', y=' + min[1] + ' after ' + min.iterations + ' iterations');
```

## License

MIT
