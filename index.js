(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window).
        root.mathopt = factory();
  }
}(this, function () {
    var euclideanLength = function(x) {
        var v = 0;
        for(var i = x.length; i--;) {
            v += x[i] * x[i];
        }
        return Math.sqrt(v);
    };
    var copy = function(from, to, n) {
        while(n--){
            to[n] = from[n];
        }
    };
    var vectorize = function(f) {
        return function(x) {
            return f.apply(null, x);
        };
    };
    return {
        basicPSO: function(f, options) {
            var iteration, iterationLoop, result, allIdle, i, j, best, v, p, pbest, c, cbest;

            // Normalize arguments.
            options = options || {};
            options.oniteration = options.oniteration || function(cb) {
                setTimeout(cb, 0);
            };
            options.onstop = options.onstop || null;
            options.inertia = options.inertia || 0.7;
            options.localAcceleration = options.localAcceleration || 2;
            options.globalAcceleration = options.globalAcceleration || 2;
            options.particles = options.particles || 20;
            options.idleSpeed = options.idleSpeed || 0.01;
            if(!options.dimensions) {
                options.dimensions = f.length;
                f = vectorize(f);
            }
            if(!options.initialPosition) {
                options.initialPosition = [];
                for(i = options.dimensions; i--;) {
                    options.initialPosition.push(0);
                }
            }

            // Initialize state.
            p = new Array(options.particles);
            pbest = p.slice(0);
            v = p.slice(0);
            cbest = p.slice(0);
            best = 0;
            for(i = p.length; i--;) {
                p[i] = options.initialPosition.slice(0);
                v[i] = [];
                for(j = options.dimensions; j--;) {
                    v[i].push(2 * Math.random());
                }
                pbest[i] = p[i].slice(0);
                cbest[i] = f(p[i]);
                if(cbest[i] < cbest[best]) {
                    best = i;
                }
            }

            // Find result.
            result = pbest[best].slice(0);
            result.iterations = 0;
            iteration = function() {
                result.iterations++;
                allIdle = true;
                for(i = options.particles; i--;) {
                    for(j = options.dimensions; j--;) {
                        v[i][j] = options.inertia * v[i][j] +
                            options.localAcceleration * Math.random() * (pbest[i][j] - p[i][j]) +
                            options.globalAcceleration * Math.random() * (pbest[best][j] - p[i][j]);
                        p[i][j] += v[i][j];
                    }

                    if(euclideanLength(v[i]) > options.idleSpeed) {
                        allIdle = false;
                    }

                    c = f(p[i]);
                    if(c < cbest[i]) {
                        cbest[i] = c;
                        copy(p[i], pbest[i], options.dimensions);
                        if(c < cbest[best]) {
                            best = i;
                        }
                    }
                }
            };
            allIdle = false;
            if(options.onstop) {
                iterationLoop = function() {
                    if(allIdle) {
                        copy(pbest[best], result, options.dimensions);
                        result.value = cbest[best];
                        options.onstop(result);
                    } else {
                        options.oniteration(p, v, pbest, best, function() {
                            iteration();
                            iterationLoop();
                        });
                    }
                };
                iterationLoop();
            } else {
                while(!allIdle) {
                    options.oniteration(p, v, pbest, best);
                    iteration();
                }
                copy(pbest[best], result, options.dimensions);
                result.value = cbest[best];
                return result;
            }
        }
    };
}));
